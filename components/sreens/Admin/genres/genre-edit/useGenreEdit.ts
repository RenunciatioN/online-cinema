import { SubmitHandler, UseFormSetValue } from 'react-hook-form';
import { useRouter, usePathname } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';

import { GenreService } from '@services/genre.service';
import { toastError, toastSuccess } from '@utils/toast';
import { IGenreEditInput } from './genre-edit.interface';
import { getAdminUrl } from '@/config/url.config';
import { getKeys } from '@utils/object/getKeys';

export const useGenreEdit = (setValue: UseFormSetValue<IGenreEditInput>) => {
	const router = useRouter();
	const pathname = usePathname();

	const arrayStr: string[] = pathname.split('/');
	const genreId: string = arrayStr[arrayStr.length - 1];

	const {  isInitialLoading } = useQuery(
		['genre', genreId],
		() => GenreService.getByid(genreId),
		{
			onSuccess: ({ data }) => {
				getKeys(data).forEach((key) => {
					setValue(key, data[key]);
				});

				// setValue('name', data.name)
			},
			onError: (error) => {
				toastError(`Get genre - ${error}`);
			},
			enabled: !!genreId,
		}
	);

	const { mutateAsync } = useMutation(
		['update genre'],
		(data: IGenreEditInput) => GenreService.update(genreId, data),
		{
			onError: (error) => {
				toastError(`Update genre - ${error}`);
			},
			onSuccess: () => {
				toastSuccess('Жанр обновлен');
				router.push(getAdminUrl('genres'));
			},
		}
	);

	const onSubmit: SubmitHandler<IGenreEditInput> = async (data) => {
		await mutateAsync(data);
	};

	return { onSubmit, isInitialLoading };
};

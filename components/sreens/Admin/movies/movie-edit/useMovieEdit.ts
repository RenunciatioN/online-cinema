import { SubmitHandler, UseFormSetValue } from 'react-hook-form';
import { useRouter, usePathname } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';

import { MovieService } from '@services/movie.service';
import { toastError, toastSuccess } from '@utils/toast';

import { getAdminUrl } from '@/config/url.config';
import { getKeys } from '@utils/object/getKeys';
import { IMovieEditInput } from './movie-edit.interface';

export const useMovieEdit = (setValue: UseFormSetValue<IMovieEditInput>) => {
	const router = useRouter();
	const pathname = usePathname();

	const arrayStr: string[] = pathname.split('/');
	const movieId: string = arrayStr[arrayStr.length - 1];

	const {  isInitialLoading } = useQuery(
		['movie', movieId],
		() => MovieService.getByid(movieId),
		{
			onSuccess: ({ data }) => {
				getKeys(data).forEach((key) => {
					setValue(key, data[key]);
				});

				// setValue('name', data.name)
			},
			onError: (error) => {
				toastError(`Get movie - ${error}`);
			},
			enabled: !!movieId,
		}
	);

	
	const { mutateAsync } = useMutation(
		['update movie'],
		(data: IMovieEditInput) => MovieService.update(movieId, data),
		{
			onError: (error) => {
				toastError(`Update movie - ${error}`);
			},
			onSuccess: () => {
				toastSuccess('Фильм обновлен');
				router.push(getAdminUrl('movies'));
			},
		}
	);

	const onSubmit: SubmitHandler<IMovieEditInput> = async (data) => {
		await mutateAsync(data);
	};

	return { onSubmit, isInitialLoading };
};

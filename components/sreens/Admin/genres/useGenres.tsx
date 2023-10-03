import { ChangeEvent, useMemo, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { getAdminUrl } from '@/config/url.config';
import { ITableItem } from '@components/UI/admin-table/admin-table.interface';
import { useDebounce } from '@hooks/useDebounce';
import { toastError, toastSuccess } from '@utils/toast';
import { GenreService } from '@services/genre.service';

export const useGenres = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const debounceSearch = useDebounce(searchTerm, 500);
	const router = useRouter();

	const queryData = useQuery(
		['genre list', debounceSearch],
		() => GenreService.getAll(debounceSearch),
		{
			select: ({ data }) =>
				data.map(
					(genre): ITableItem => ({
						_id: genre._id,
						editUrl: getAdminUrl(`genres/edit/${genre._id}`),
						items: [genre.name, genre.slug],
					})
				),
			onError: (err) => {
				toastError(`Жанры - ${err}`);
			},
		}
	);

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const { mutateAsync: createAsync } = useMutation(
		['create genre'],
		() => GenreService.create(),
		{
			onError: (err) => {
				toastError(`Create genre - ${err}`);
			},
			onSuccess: ({ data: id }) => {
				router.push(getAdminUrl(`genres/edit/${id}`));
			},
		}
	);

	const { mutateAsync: deleteAsync } = useMutation(
		['delete genre'],
		(genreId: string) => GenreService.delete(genreId),
		{
			onError: (err) => {
				toastError(`Delete genre - ${err}`);
			},
			onSuccess: () => {
				toastSuccess('Жанр удален');
				queryData.refetch();
			},
		}
	);

	return useMemo(
		() => ({
			handleSearch,
			...queryData,
			searchTerm,
			deleteAsync,
			createAsync,
		}),
		[queryData, searchTerm, deleteAsync, createAsync]
	);
};

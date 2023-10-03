import { ChangeEvent, useMemo, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { getAdminUrl } from '@/config/url.config';
import { ITableItem } from '@components/UI/admin-table/admin-table.interface';
import { useDebounce } from '@hooks/useDebounce';
import { toastError } from '@utils/toast';
import { getGenreList } from '@utils/movie/getGenreList';
import { MovieService } from '@services/movie.service';
import { useRouter } from 'next/navigation';

export const useMovies = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const debounceSearch = useDebounce(searchTerm, 500);
	const router = useRouter()

	const queryData = useQuery(
		['movie list', debounceSearch],
		() => MovieService.getAll(debounceSearch),
		{
			select: ({ data }) =>
				data.map(
					(movie): ITableItem => ({
						_id: movie._id,
						editUrl: getAdminUrl(`movies/edit/${movie._id}`),
						items: [
							movie.title,
							getGenreList(movie.genres),
							String(movie.rating),
						],
					})
				),
			onError: (err) => {
				toastError(`Фильмы - ${err}`);
			},
		}
	);

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	
	const { mutateAsync: createAsync } = useMutation(
		['create movie'],
		() => MovieService.create(),
		{
			onError: (err) => {
				toastError(`Create movie - ${err}`);
			},
			onSuccess: ({data: id}) => {
				router.push(getAdminUrl(`movies/edit/${id}`))
			},
		}
	);

	const { mutateAsync: deleteAsync } = useMutation(
		['delete movie'],
		(movieId: string) => MovieService.delete(movieId),
		{
			onError: (err) => {
				toastError(`Delete movie - ${err}`);
			},
			onSuccess: () => {
				toast.success('Фильм удален');
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
			createAsync
		}),
		[queryData, searchTerm, deleteAsync]
	);
};

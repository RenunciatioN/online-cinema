import { ChangeEvent, useState } from 'react';
import { useDebounce } from '@hooks/useDebounce';
import { MovieService } from '@services/movie.service';
import { useQuery } from '@tanstack/react-query';

export const useSearch = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const debounceSearch = useDebounce(searchTerm, 500);

	const { isSuccess, data } = useQuery(
		['search movie list', debounceSearch],
		() => MovieService.getAll(debounceSearch),
		{
			select: ({ data }) => data,
			enabled: !!debounceSearch,
		}
	);

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	return { isSuccess, handleSearch, data, searchTerm };
};

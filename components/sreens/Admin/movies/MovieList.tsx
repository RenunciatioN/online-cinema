'use client';

import { FC } from 'react';

import AdminNavigation from '@UI/admin-navigation/AdminNavigation';
import AdminHeader from '@UI/admin-table/admin-header/AdminHeader';
import Heading from '@UI/heading/Heading';
import AdminTable from '@UI/admin-table/AdminTable';

import { useMovies } from './useMovies';

const MovieList: FC = () => {
	const {
		isLoading,
		handleSearch,
		data,
		searchTerm,
		deleteAsync,
		createAsync,
	} = useMovies();

	return (
		<>
			<AdminNavigation />
			<Heading title="Фильмы" />

			<AdminHeader
				handleSearch={handleSearch}
				searchTerm={searchTerm}
				onClick={createAsync}
			/>
			<AdminTable
				isLoading={isLoading}
				removeHandler={deleteAsync}
				headerItems={['Название', 'Жанры', 'Рейтинг']}
				tableItems={data || []}
			/>
		</>
	);
};
export default MovieList;

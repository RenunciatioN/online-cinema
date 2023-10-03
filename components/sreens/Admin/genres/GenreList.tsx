'use client';

import { FC } from 'react';

import AdminNavigation from '@UI/admin-navigation/AdminNavigation';
import AdminHeader from '@UI/admin-table/admin-header/AdminHeader';
import Heading from '@UI/heading/Heading';
import AdminTable from '@UI/admin-table/AdminTable';

import { useGenres } from './useGenres';

const GenreList: FC = () => {
	const {
		isLoading,
		handleSearch,
		data,
		searchTerm,
		deleteAsync,
		createAsync,
	} = useGenres();

	return (
		<>
			<AdminNavigation />
			<Heading title="Жанры" />

			<AdminHeader
				handleSearch={handleSearch}
				searchTerm={searchTerm}
				onClick={createAsync}
			/>
			<AdminTable
				isLoading={isLoading}
				removeHandler={deleteAsync}
				headerItems={['Название', 'Slug']}
				tableItems={data || []}
			/>
		</>
	);
};
export default GenreList;

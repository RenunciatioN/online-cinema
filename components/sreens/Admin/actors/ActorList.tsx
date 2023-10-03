'use client';

import { FC } from 'react';

import AdminNavigation from '@UI/admin-navigation/AdminNavigation';
import AdminHeader from '@UI/admin-table/admin-header/AdminHeader';
import Heading from '@UI/heading/Heading';
import AdminTable from '@UI/admin-table/AdminTable';

import { useActors } from './useActors';

const ActorList: FC = () => {
	const { isLoading, handleSearch, data, searchTerm, deleteAsync, createAsync } =
		useActors();

	return (
		<>
			<AdminNavigation />
			<Heading title="Актеры" />

			<AdminHeader handleSearch={handleSearch} searchTerm={searchTerm} onClick={createAsync} />
			<AdminTable
				isLoading={isLoading}
				removeHandler={deleteAsync}
				headerItems={['Имя', 'Колличество фильмов']}
				tableItems={data || []}
			/>
		</>
	);
};
export default ActorList;

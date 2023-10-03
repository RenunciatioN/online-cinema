'use client';

import { FC } from 'react';

import AdminNavigation from '@UI/admin-navigation/AdminNavigation';
import AdminHeader from '@UI/admin-table/admin-header/AdminHeader';
import Heading from '@UI/heading/Heading';
import AdminTable from '@UI/admin-table/AdminTable';

import { useUsers } from './useUsers';

const UsersList: FC = () => {
	const { isLoading, handleSearch, data, searchTerm, deleteAsync } = useUsers();

	return (
		<>
			<AdminNavigation />
			<Heading title="Пользователи" />

			<AdminHeader handleSearch={handleSearch} searchTerm={searchTerm} />
			<AdminTable
				isLoading={isLoading}
				removeHandler={deleteAsync}
				headerItems={['Роль', 'Email', 'Дата регистрации']}
				tableItems={data || []}
			/>
		</>
	);
};
export default UsersList;

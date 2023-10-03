'use client';

import { FC } from 'react';

import Statistics from './Statistics/Statistics';
import Heading from '@components/UI/heading/Heading';
import AdminNavigation from '@UI/admin-navigation/AdminNavigation';
import { useRenderClient } from '@hooks/useRenderClient';

const Admin: FC = () => {
	const { isClientRender } = useRenderClient();
	return (
		<>
			{isClientRender ? (
				<>
					<AdminNavigation />
					<Heading title="Статистика" />
					<Statistics />
				</>
			) : null}
		</>
	);
};
export default Admin;

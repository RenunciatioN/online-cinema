import { ChangeEvent, useMemo, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { getAdminUrl } from '@/config/url.config';
import { ITableItem } from '@components/UI/admin-table/admin-table.interface';
import { useDebounce } from '@hooks/useDebounce';
import { UserService } from '@services/user.service';
import { convertMongoDate } from '@utils/date/convertMongoDate';
import { toastError } from '@utils/toast';

export const useUsers = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const debounceSearch = useDebounce(searchTerm, 500);

	const queryData = useQuery(
		['users list', debounceSearch],
		() => UserService.getAll(debounceSearch),
		{
			select: ({ data }) =>
				data.map(
					(user): ITableItem => ({
						_id: user._id,
						editUrl: getAdminUrl(`users/edit/${user._id}`),
						items: [
							user.isAdmin ? 'Admin' : 'User',
							user.email,
							convertMongoDate(user.createdAt),
						],
						isMainAdmin: user?.isMainAdmin || false,
						isAdmin: user.isAdmin,
					})
				),
			onError: (err) => {
				toastError(`Пользователи - ${err}`);
			},
		}
	);

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const { mutateAsync: deleteAsync } = useMutation(
		['delete user'],
		(userId: string) => UserService.delete(userId),
		{
			onError: (err) => {
				toastError(`Delete user - ${err}`);
			},
			onSuccess: () => {
				toast.success('Пользователь удален');
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
		}),
		[queryData, searchTerm, deleteAsync]
	);
};

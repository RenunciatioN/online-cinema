import { ChangeEvent, useMemo, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

import { getAdminUrl } from '@/config/url.config';
import { ITableItem } from '@components/UI/admin-table/admin-table.interface';
import { useDebounce } from '@hooks/useDebounce';
import { ActorService } from '@services/actor.service';
import { toastError } from '@utils/toast';

export const useActors = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const debounceSearch = useDebounce(searchTerm, 500);
	const router = useRouter();
	
	const queryData = useQuery(
		['actor list', debounceSearch],
		() => ActorService.getAll(debounceSearch),
		{
			select: ({ data }) =>
				data.map(
					(actor): ITableItem => ({
						_id: actor._id,
						editUrl: getAdminUrl(`actors/edit/${actor._id}`),
						items: [actor.name, String(actor.countMovies)],
					})
				),
			onError: (err) => {
				toastError(`Актеры - ${err}`);
			},
		}
	);

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const { mutateAsync: createAsync } = useMutation(
		['create actor'],
		() => ActorService.create(),
		{
			onError: (err) => {
				toastError(`Create actor - ${err}`);
			},
			onSuccess: ({data: id}) => {
				router.push(getAdminUrl(`actors/edit/${id}`))
			},
		}
	);

	const { mutateAsync: deleteAsync } = useMutation(
		['delete actor'],
		(actorId: string) => ActorService.delete(actorId),
		{
			onError: (err) => {
				toastError(`Delete actor - ${err}`);
			},
			onSuccess: () => {
				toast.success('Актер удален');
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
		[queryData, searchTerm, deleteAsync]
	);
};

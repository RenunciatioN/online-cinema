import { SubmitHandler, UseFormSetValue } from 'react-hook-form';
import { useRouter, usePathname } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';

import { ActorService } from '@services/actor.service';
import { toastError, toastSuccess } from '@utils/toast';
import { IActorEditInput } from './actor-edit.interface';
import { getAdminUrl } from '@/config/url.config';
import { getKeys } from '@utils/object/getKeys';

export const useActorEdit = (setValue: UseFormSetValue<IActorEditInput>) => {
	const router = useRouter();
	const pathname = usePathname();

	const arrayStr: string[] = pathname.split('/');
	const actorId: string = arrayStr[arrayStr.length - 1];

	
	const {  isInitialLoading } = useQuery(
		['actor', actorId],
		() => ActorService.getById(actorId),
		{
			onSuccess: ({ data }) => {
				getKeys(data).forEach((key) => {
					setValue(key, data[key]);
				});

				// setValue('name', data.name)
			},
			onError: (error) => {
				toastError(`Get actor - ${error}`);
			},
			enabled: !!actorId,
		}
	);

	const { mutateAsync } = useMutation(
		['update actor'],
		(data: IActorEditInput) => ActorService.update(actorId, data),
		{
			onError: (error) => {
				toastError(`Update actor - ${error}`);
			},
			onSuccess: () => {
				toastSuccess('Актер обновлен');
				router.push(getAdminUrl('actors'));
			},
		}
	);

	const onSubmit: SubmitHandler<IActorEditInput> = async (data) => {
		await mutateAsync(data);
	};

	return { onSubmit, isInitialLoading };
};

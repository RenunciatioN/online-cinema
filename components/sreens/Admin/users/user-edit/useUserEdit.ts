import { SubmitHandler, UseFormSetValue } from 'react-hook-form';
import { useRouter, usePathname } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';

import { UserService } from '@services/user.service';
import { toastError, toastSuccess } from '@utils/toast';
import { IUserEditInput } from './user-edit.interface';
import { getAdminUrl } from '@/config/url.config';

export const useUserEdit = (setValue: UseFormSetValue<IUserEditInput>) => {
	const router = useRouter();
	const pathname = usePathname();

	const arrayStr: string[] = pathname.split('/');
	const userId: string = arrayStr[arrayStr.length - 1];

	const { isInitialLoading } = useQuery(
		['user', userId],
		() => UserService.getByid(userId),
		{
			onSuccess: ({ data }) => {
				setValue('email', data.email);
				setValue('isAdmin', data.isAdmin);
			},
			onError: (error) => {
				toastError(`Get user - ${error}`);
			},
			enabled: !!userId,
		}
	);

	const { mutateAsync } = useMutation(
		['update user'],
		(data: IUserEditInput) => UserService.update(userId, data),
		{
			onError: (error) => {
				toastError(`Update user - ${error}`);
			},
			onSuccess: () => {
				toastSuccess('Пользователь обновлен');
				router.push(getAdminUrl('users'));
			},
		}
	);

	const onSubmit: SubmitHandler<IUserEditInput> = async (data) => {
		await mutateAsync(data);
	};

	return { onSubmit, isInitialLoading };
};

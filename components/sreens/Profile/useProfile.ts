import { SubmitHandler, UseFormSetValue } from 'react-hook-form';
import { IProfileInput } from './profile.interface';
import { useMutation, useQuery } from '@tanstack/react-query';
import { UserService } from '@services/user.service';
import { toastError, toastSuccess } from '@utils/toast';

export const useProfile = (setValue: UseFormSetValue<IProfileInput>) => {
	const { isInitialLoading } = useQuery(
		['profile'],
		() => UserService.getProfile(),
		{
			onSuccess: ({ data }) => {
				setValue('email', data.email);
			},
			onError: (error) => {
				toastError(`Get user - ${error}`);
			},
		}
	);

	const { mutateAsync } = useMutation(
		['update profile'],
		(data: IProfileInput) => UserService.updateProfile(data),
		{
			onError: (error) => {
				toastError(`Update profile - ${error}`);
			},
			onSuccess: () => {
				toastSuccess('Профиль обновлен');
			},
		}
	);

	const onSubmit: SubmitHandler<IProfileInput> = async (data) => {
		await mutateAsync(data);
	};

	return { onSubmit, isInitialLoading };
};

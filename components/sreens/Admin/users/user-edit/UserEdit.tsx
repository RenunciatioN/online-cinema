'use client';

import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { useUserEdit } from './useUserEdit';
import AdminNavigation from '@UI/admin-navigation/AdminNavigation';
import Heading from '@UI/heading/Heading';
import SkeletonLoader from '@UI/SkeletonLoader';
import Button from '@components/UI/form-elements/Button';

import { IUserEditInput } from './user-edit.interface';

import formStyles from '@UI/form-elements/admin-form.module.scss';
import AuthFields from '@components/sreens/Auth/AuthFields';

const UserEdit: FC = () => {
	const { handleSubmit, register, setValue, formState, control } =
		useForm<IUserEditInput>({
			mode: 'onChange',
		});

	const { isInitialLoading, onSubmit } = useUserEdit(setValue);
	const router = useRouter();

	return (
		<>
			<AdminNavigation />
			<Heading title="Редактирование пользователя" />

			<form onSubmit={handleSubmit(onSubmit)} className="admin-form">
				{isInitialLoading ? (
					<SkeletonLoader count={3} className="mt-5 h-10" />
				) : (
					<>
						<AuthFields register={register} formState={formState} />

						<Controller
							control={control}
							name="isAdmin"
							render={({ field }) => (
								<button
									onClick={(e) => {
										e.preventDefault();
										field.onChange(!field.value);
									}}
									className={formStyles.changeRulesBtn}
								>
									{field.value ? 'Снять права админа' : 'Сделать админом'}
								</button>
							)}
						/>

						<div className={formStyles.buttons}>
							<div className={formStyles.back} onClick={() => router.back()}>
								Назад
							</div>
							<Button>Обновить</Button>
						</div>
					</>
				)}
			</form>
		</>
	);
};
export default UserEdit;

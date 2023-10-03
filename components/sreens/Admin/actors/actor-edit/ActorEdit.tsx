'use client';

import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import AdminNavigation from '@UI/admin-navigation/AdminNavigation';
import Heading from '@UI/heading/Heading';
import SkeletonLoader from '@UI/SkeletonLoader';
import Field from '@UI/form-elements/Field';
import SlugField from '@components/UI/form-elements/SlugField/SlugField';
import generateSlug from '@utils/string/generateSlug';
import Button from '@components/UI/form-elements/Button';

import { useActorEdit } from './useActorEdit';

import { IActorEditInput } from './actor-edit.interface';

import formStyles from '@UI/form-elements/admin-form.module.scss';
import UploadField from '@components/UI/form-elements/UploadField/UploadField';

const ActorEdit: FC = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		getValues,
		clearErrors,
		control,
	} = useForm<IActorEditInput>({
		mode: 'onChange',
	});

	const { isInitialLoading, onSubmit } = useActorEdit(setValue);
	const router = useRouter();

	return (
		<>
			<AdminNavigation />
			<Heading title="Редактирование актера" />

			<form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
				{isInitialLoading ? (
					<SkeletonLoader count={3} className="mt-5 h-10" />
				) : (
					<>
						<div className={formStyles.fileds}>
							<Field
								{...register('name', {
									required: 'Поле "название" обязательно!',
								})}
								placeHolder="Название"
								error={errors.name}
							/>
							<div>
								<SlugField
									register={register}
									error={errors.slug}
									generate={() => {
										setValue('slug', generateSlug(getValues('name')));
										clearErrors('slug');
									}}
								/>
							</div>

							<Controller
								control={control}
								name="photo"
								defaultValue=""
								render={({
									field: { value, onChange },
									fieldState: { error },
								}) => (
									<UploadField
										onChange={onChange}
										value={value}
										error={error}
										folder="actors"
										placeholder="Фотография"
									/>
								)}
								rules={{
									required: 'Фотография обязательна',
								}}
							/>
						</div>
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
export default ActorEdit;

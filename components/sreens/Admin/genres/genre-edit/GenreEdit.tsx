'use client';

import { FC } from 'react';
import { useForm } from 'react-hook-form';
import {  useRouter } from 'next/navigation';

import { useGenreEdit } from './useGenreEdit';
import AdminNavigation from '@UI/admin-navigation/AdminNavigation';
import Heading from '@UI/heading/Heading';
import SkeletonLoader from '@UI/SkeletonLoader';
import Field from '@UI/form-elements/Field';
import SlugField from '@components/UI/form-elements/SlugField/SlugField';
import generateSlug from '@utils/string/generateSlug';
import Button from '@components/UI/form-elements/Button';
import FieldArea from '@components/UI/form-elements/FieldArea';

import { IGenreEditInput } from './genre-edit.interface';

import formStyles from '@UI/form-elements/admin-form.module.scss';

const GenreEdit: FC = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		getValues,
		clearErrors,
	} = useForm<IGenreEditInput>({
		mode: 'onChange',
	});

	const { isInitialLoading, onSubmit } = useGenreEdit(setValue);
	const router = useRouter()

	return (
		<>
			<AdminNavigation />
			<Heading title="Редактирование жанра" />

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
								style={{ width: '31%' }}
							/>
							<div style={{ width: '31%' }}>
								<SlugField
									register={register}
									error={errors.slug}
									generate={() => {
										setValue('slug', generateSlug(getValues('name')));
										clearErrors('slug');
									}}
								/>
							</div>

							<Field
								{...register('icon', {
									required: 'Поле "icon" обязательно!',
								})}
								placeHolder="Icon"
								error={errors.icon}
								style={{ width: '31%' }}
							/>

							<FieldArea
								{...register('description', {
									required: 'Поле "Описание" обязательно!',
								})}
								placeHolder="Описание"
								error={errors.description}
							/>
						</div>
						<div className={formStyles.buttons}>
							<div className={formStyles.back} onClick={() => router.back() }>Назад</div>
							<Button>Обновить</Button>
						</div>
					</>
				)}
			</form>
		</>
	);
};
export default GenreEdit;

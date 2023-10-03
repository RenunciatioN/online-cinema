'use client';

import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { useMovieEdit } from './useMovieEdit';
import { useAdminGenre } from './useAdminGenre';
import { useAdminActor } from './useAdminMovie';

import AdminNavigation from '@UI/admin-navigation/AdminNavigation';
import Heading from '@UI/heading/Heading';
import SkeletonLoader from '@UI/SkeletonLoader';
import Field from '@UI/form-elements/Field';
import SlugField from '@components/UI/form-elements/SlugField/SlugField';
import generateSlug from '@utils/string/generateSlug';
import Button from '@components/UI/form-elements/Button';
import UploadField from '@components/UI/form-elements/UploadField/UploadField';

import { IMovieEditInput } from './movie-edit.interface';

import formStyles from '@UI/form-elements/admin-form.module.scss';
import dynamic from 'next/dynamic';
import FieldArea from '@components/UI/form-elements/FieldArea';

const DynamicSelect = dynamic(() => import('@UI/select/Select'));

const MovieEdit: FC = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		getValues,
		clearErrors,
		control,
	} = useForm<IMovieEditInput>({
		mode: 'onChange',
	});

	const { isInitialLoading, onSubmit } = useMovieEdit(setValue);
	const router = useRouter();

	const { isLoading: isGenresLoading, data: genres } = useAdminGenre();
	const { isLoading: isActorsLoading, data: actors } = useAdminActor();

	return (
		<>
			<AdminNavigation />
			<Heading title="Редактирование фильмов" />

			<form onSubmit={handleSubmit((data) => {
				console.log(data)
				onSubmit(data)
			})} className={formStyles.form}>
				{isInitialLoading ? (
					<SkeletonLoader count={3} className="mt-5 h-10" />
				) : (
					<>
						<div className={formStyles.fileds}>
							<Field
								{...register('title', {
									required: 'Поле "название" обязательно!',
								})}
								placeHolder="Название"
								error={errors.title}
								style={{ width: '48%' }}
							/>
							<div style={{ width: '48%' }}>
								<SlugField
									register={register}
									error={errors.slug}
									generate={() => {
										setValue('slug', generateSlug(getValues('title')));
										clearErrors('slug');
									}}
								/>
							</div>

							<Field
								{...register('parametrs.country', {
									required: 'Поле "страна" обязательно!',
								})}
								placeHolder="Страна"
								error={errors.parametrs?.country}
								style={{ width: '31%' }}
							/>

							<Field
								{...register('parametrs.duration', {
									required: 'Поле "длительность" обязательно!',
								})}
								placeHolder="Длительность"
								error={errors.parametrs?.duration}
								style={{ width: '31%' }}
							/>
							<Field
								{...register('parametrs.year', {
									required: 'Поле "год выхода" обязательно!',
								})}
								placeHolder="Год выхода"
								error={errors.parametrs?.year}
								style={{ width: '31%' }}
							/>

							<FieldArea
								{...register('description', {
									required: 'Поле "Описание" обязательно!',
								})}
								placeHolder="Описание"
								error={errors.description}
							/>

							<Controller
								control={control}
								name="genres"
								render={({ field, fieldState: { error } }) => (
									<DynamicSelect
										field={field}
										options={genres || []}
										isLoading={isGenresLoading}
										isMulti
										placeHolder="Жанры"
										error={error}
									/>
								)}
								rules={{
									required: 'Выберете минимум один жанр',
								}}
							/>

							<Controller
								control={control}
								name="actors"
								render={({ field, fieldState: { error } }) => (
									<DynamicSelect
										field={field}
										options={actors || []}
										isLoading={isActorsLoading}
										isMulti
										placeHolder="Актеры"
										error={error}
									/>
								)}
								rules={{
									required: 'Выберете минимум одного актера',
								}}
							/>

							<Controller
								control={control}
								name="poster"
								defaultValue=""
								render={({
									field: { value, onChange },
									fieldState: { error },
								}) => (
									<UploadField
										onChange={onChange}
										value={value}
										error={error}
										folder="movies"
										placeholder="Постер"
									/>
								)}
								rules={{
									required: 'Постер обязателен',
								}}
							/>

							<Controller
								control={control}
								name="bigPoster"
								defaultValue=""
								render={({
									field: { value, onChange },
									fieldState: { error },
								}) => (
									<UploadField
										onChange={onChange}
										value={value}
										error={error}
										folder="movies"
										placeholder="Big Постер"
									/>
								)}
								rules={{
									required: ' Big Постер обязателен',
								}}
							/>
							<Controller
								control={control}
								name="videoUrl"
								defaultValue=""
								render={({
									field: { value, onChange },
									fieldState: { error },
								}) => (
									<UploadField
										onChange={onChange}
										value={value}
										error={error}
										folder="movies"
										placeholder="Видео"
										isNoImage
										style={{ marginTop: -25 }}
									/>
								)}
								rules={{
									required: 'Видео обязательно',
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
export default MovieEdit;

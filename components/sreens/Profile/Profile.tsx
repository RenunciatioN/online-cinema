'use client'

import { FC } from 'react';
import { useForm } from 'react-hook-form';

import styles from './Profile.module.scss';
import { IProfileInput } from './profile.interface';
import { useProfile } from './useProfile';
import Heading from '@components/UI/heading/Heading';
import Button from '@components/UI/form-elements/Button';
import AuthFields from '../Auth/AuthFields';
import SkeletonLoader from '@components/UI/SkeletonLoader';
import { useRenderClient } from '@hooks/useRenderClient';

const Profile: FC = () => {
	const { register, handleSubmit, formState, setValue } =
		useForm<IProfileInput>({
			mode: 'onChange',
		});

	const { isInitialLoading, onSubmit } = useProfile(setValue);

  const {isClientRender} = useRenderClient()

  if (!isClientRender) return null 

	return (
		<div className={styles.wrapper}>
			<Heading title={'Профиль'} className="mb-6" />
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				{isInitialLoading ? (
					<SkeletonLoader count={2} />
				) : (
					<AuthFields formState={formState} register={register} />
				)}
				<Button>Обновить</Button>
			</form>
		</div>
	);
};

export default Profile;

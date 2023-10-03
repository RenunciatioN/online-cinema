'use client';

import { FC, useState } from 'react';
import { useAuthRedirect } from './useAuthRedirect';
import { useAuth } from '@hooks/useAuth';
import { SubmitHandler, useForm } from 'react-hook-form';
import { signIn } from "next-auth/react"

import { IAuthInput } from './auth.interface';
import styles from './Auth.module.scss';
import Heading from '@components/UI/heading/Heading';
import Button from '@components/UI/form-elements/Button';
import AuthFields from './AuthFields';
import { useActions } from '@hooks/useActions';

const Auth: FC = () => {
	const [type, setType] = useState<'login' | 'register'>('login');
	const { isLoading } = useAuth();
	useAuthRedirect();

	const {
		register: registerInput,
		handleSubmit,
		formState,
		reset,
	} = useForm<IAuthInput>({
		mode: 'onBlur',
	});

	const { login, register } = useActions();

	const onSubmit: SubmitHandler<IAuthInput> = async (data) => {
		if (type === 'login') {
			login(data)
			const res = await signIn('credentials', {
				email: data.email,
				password: data.password,
				redirect: false
			})
		}
		else if (type === 'register') register(data);
		reset();
	};

	return (
		<div className={styles.wrapper}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Heading title={'Авторизация'} className="mb-6" />
				<AuthFields
					formState={formState}
					register={registerInput}
					isPasswordRequired
				/>
				<div className={styles.buttons}>
					<Button
						type="submit"
						onClick={() => setType('login')}
						disabled={isLoading}
					>
						Войти
					</Button>
					<Button
						type="submit"
						onClick={() => setType('register')}
						disabled={isLoading}
					>
						Регистрация
					</Button>
				</div>
			</form>
		</div>
	);
};
export default Auth;

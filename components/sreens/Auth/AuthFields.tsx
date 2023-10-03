import { FormState, UseFormRegister } from 'react-hook-form';

import { validEmail } from '@shared/regex';
import { FC } from 'react';
import Field from '@components/UI/form-elements/Field';

interface IAuthFields {
	register: UseFormRegister<any>;
	formState: FormState<any>;
	isPasswordRequired?: boolean;
}

const AuthFields: FC<IAuthFields> = ({
	register,
	formState: {errors},
	isPasswordRequired = false,
}) => {

	return (
		<>
			<Field
				{...register('email', {
					required: 'Email обязателен',
					pattern: {
						value: validEmail,
						message: 'Введите действительный email адрес',
					},
				})}
				placeHolder="E-mail"
				// error={errors.email}
			/>
			<Field
				{...register(
					'password',
					isPasswordRequired
						? {
								required: 'Пароль обязателен',
								minLength: {
									value: 6,
									message: 'Минимальная длина пароля 6 символов',
								},
						  }
						: {}
				)}
				placeHolder="Пароль"
				type="password"
				// error={errors.password}
			/>
		</>
	);
};
export default AuthFields;

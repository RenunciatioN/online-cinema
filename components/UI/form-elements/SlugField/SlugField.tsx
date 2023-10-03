import { FC } from 'react';

import styles from './SlugField.module.scss';
import { FieldError, UseFormRegister } from 'react-hook-form';
import Field from '../Field';

interface ISlugField {
	error?: FieldError;
	register: UseFormRegister<any>;
	generate: () => void;
}

const SlugField: FC<ISlugField> = ({ generate, register, error }) => {
	return (
		<div className="relative">
			<Field
				{...register('slug', {
					required: 'Поле "slug" обязательно!',
				})}
				placeHolder="Slug"
				error={error}
			/>

			<div className={styles.badge} onClick={generate}>
				Сгенерировать
			</div>
		</div>
	);
};
export default SlugField;

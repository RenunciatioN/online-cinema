import { FC } from 'react';
import AuthButton from './AuthButton';

import styles from './AuthPlaceholder.module.scss'

const AuthPlaceholder: FC<{ slug: string }> = ({ slug }) => {
	return (
		<div className={styles.placeholder}>
			<div>
				<div>Просмотр разрешен только авторизованным пользователям.</div>
				<AuthButton slug={slug} />
			</div>
		</div>
	);
};
export default AuthPlaceholder;

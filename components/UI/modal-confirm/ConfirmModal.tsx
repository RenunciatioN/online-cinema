import { FC } from 'react';

import styles from './ConfirmModal.module.scss'

interface IConfirmModal {
    message : string
    closeHandler: () => void
    confirmHandler: () => void
}


const ConfirmModal: FC<IConfirmModal> = ({ message, closeHandler, confirmHandler }) => {
	return (
		<div className={styles.modal}>
			<div className={styles.message}>{message}</div>

			<div className={styles.btnWarpper}>
				<button onClick={confirmHandler}>Да</button>
				<button onClick={closeHandler}>Нет</button>
			</div>
		</div>
	);
};
export default ConfirmModal;

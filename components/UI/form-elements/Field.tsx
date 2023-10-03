import { forwardRef } from 'react';
import cn from 'classnames';

import { IField } from './form.interface';

import styles from './form.module.scss';

const Field = forwardRef<HTMLInputElement, IField>(
	({ placeHolder, error, type = 'text', style, ...rest }, ref) => {
		return (
			<div className={cn(styles.common, styles.field)} style={style}>
				<label>
					<span>{placeHolder}</span>
					<input type={type} ref={ref} {...rest} />
				</label>
                {error && <div className={styles.error}>{error.message}</div>}
			</div>
		);
	}
);

Field.displayName = 'Field';
export default Field;

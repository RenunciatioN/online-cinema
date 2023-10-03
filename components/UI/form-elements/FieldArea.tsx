import { forwardRef } from 'react';
import cn from 'classnames';

import { IFieldArea } from './form.interface';

import styles from './form.module.scss';

const FieldArea = forwardRef<HTMLTextAreaElement, IFieldArea>(
	({ placeHolder, error, style, ...rest }, ref) => {
		return (
			<div className={cn(styles.common, styles.field , styles.textArea)} style={style}>
				<label>
					<span>{placeHolder}</span>
                    
					<textarea  ref={ref} {...rest}  />
				</label>
                {error && <div className={styles.error}>{error.message}</div>}
			</div>
		);
	}
);

FieldArea.displayName = 'Field';

export default FieldArea;

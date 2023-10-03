import { FC } from 'react';
import cn from 'classnames';

import styles from './SlideArrow.module.scss';
import MaterialIcon from '@components/UI/MaterialIcon';

interface ISlideArrow {
	variant: 'left' | 'right';
	clickHanlder: () => void;
}

const SlideArrow: FC<ISlideArrow> = ({ clickHanlder, variant }) => {
	const isLeft = variant === 'left';

	return (
		<button
			onClick={clickHanlder}
			className={cn(styles.arrow, {
				[styles.left]: isLeft,
				[styles.right]: !isLeft,
			})}
			aria-label={isLeft ? 'Предудущий слайд' : 'Следующий слайд'}
		>
			<MaterialIcon name={isLeft ? 'MdChevronLeft' : 'MdChevronRight'} />
		</button>
	);
};
export default SlideArrow;

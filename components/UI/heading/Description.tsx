import { FC } from 'react';
import cn from 'classnames'

interface IDesription {
	text: string;
	className?: string;
}

const Desription: FC<IDesription> = ({ text, className }) => {
	return (
		<div className={cn('text-lg font-light text-white text-opacity-60', className)}>
            <p>{text}</p>
        </div>
	);
};
export default Desription;

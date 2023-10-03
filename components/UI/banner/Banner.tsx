import { FC } from 'react';
import  cn  from 'classnames';

interface IBanner {
	image: string;
	Detail?: FC | null;
	className?: string
}
import styles from './Banner.module.scss';
import Image from 'next/image';

const Banner: FC<IBanner> = ({ image, Detail,className }) => {
	return (
		<div className={cn(styles.banner, className)}>
			<Image
				src={image}
				draggable={false}
				fill
				className="image-like-bg object-top"
				unoptimized
				priority
				alt=""
			/>

            {Detail && <Detail />}
		</div>
	);
};
export default Banner;

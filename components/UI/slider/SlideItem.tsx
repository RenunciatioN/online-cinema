'use client';

import { FC } from 'react';

import { ISlide } from './sllider.interface';
import { useRouter } from 'next/navigation';

import styles from './Slider.module.scss';
import Image from 'next/image';

interface ISlideItem {
	slide: ISlide;
	buttonTitle?: string;
}

const SlideItem: FC<ISlideItem> = ({ slide, buttonTitle = 'Смотреть' }) => {
	const router = useRouter();

	return (
		<div className={styles.slide}>
			{slide.bigPoster && (
				<Image
					src={slide.bigPoster}
					className={styles.image}
					alt={slide.title}
					unoptimized
					priority
					draggable={false}
					width={1064}
					height={300}
				/>
			)}

			<div className={styles.content}>
				<div className={styles.heading}>{slide.title}</div>
				<div className={styles.subHeading}>{slide.subTitle}</div>
				<button
					className={styles.button}
					onClick={() => router.push(slide.link)}
				>
					{buttonTitle}
				</button>
			</div>
		</div>
	);
};
export default SlideItem;

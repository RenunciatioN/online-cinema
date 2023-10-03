'use client'

import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import styles from './Gallery.module.scss';
import { IGalleryItem } from './gallery.interface';
import GalleryItem from './GalleryItem';

const Gallery: FC<{ items: IGalleryItem[] }> = ({ items }) => {
	return (
		<div className={styles.gallery}>
			<Swiper
				spaceBetween={0}
				slidesPerView={5.8}
				onSlideChange={() => console.log('slide change')}
				onSwiper={(swiper) => console.log(swiper)}
			>
				{items.slice(0, 7).map((item) => (
					<SwiperSlide key={item.link}>
						<GalleryItem item={item} variant="vertical" />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};
export default Gallery;

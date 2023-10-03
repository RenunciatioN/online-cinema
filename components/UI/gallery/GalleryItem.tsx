import { FC } from 'react';
import cn from 'classnames';

import styles from './Gallery.module.scss';
import { iGalleryItemProps } from './gallery.interface';
import Link from 'next/link';
import Image from 'next/image';

const GalleryItem: FC<iGalleryItemProps> = ({ item, variant }) => {
	return (
		<Link
			href={item.link}
			className={cn(styles.item, {
				[styles.withText]: item.content,
				[styles.horizontal]: variant === 'horizontal',
				[styles.vertical]: variant === 'vertical',
			})}
		>
			<Image alt={item.name} fill  src={item.posterPath} draggable={false} priority className="w-full h-auto" />
			{item.content && (
				<div className={styles.content}>
					<div className={styles.title}>{item.content.title}</div>
					{item.content.subTitle && (
						<div className={styles.subTitle}>{item.content.subTitle}</div>
					)}
				</div>
			)}
		</Link>
	);
};
export default GalleryItem;

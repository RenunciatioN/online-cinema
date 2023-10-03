import Link from 'next/link';
import { FC } from 'react';
import cn from 'classnames';

import GenreImage from './GenresImage';

import { getGenreUrl } from '@/config/url.config';
import { ICollection } from './collections.interface';

import styles from './Genres.module.scss';

const GenresItem: FC<{ collection: ICollection }> = ({ collection }) => {
	return (
		<Link href={getGenreUrl(collection.slug)} className={styles.collection}>
			<GenreImage collection={collection} />

			<div className={styles.content}>
				<div className={styles.title}>{collection.title}</div>
			</div>

			<div className={cn(styles.behind, styles.second)}>
				<GenreImage collection={collection} />
			</div>
			<div className={cn(styles.behind, styles.third)}>
				<GenreImage collection={collection} />
			</div>
		</Link>
	);
};
export default GenresItem;

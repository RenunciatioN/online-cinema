import { FC } from 'react';
import styles from './Favorites.module.scss';
import { IMovie } from '@shared/types/movie.types';
import FavoritesButton from '../single-movie/FavoritesButton/FavoritesButton';
import Link from 'next/link';
import { getMovieUrl } from '@/config/url.config';
import Image from 'next/image';

const FavoritesItem: FC<{ movie: IMovie }> = ({ movie }) => {
	return (
		<div className={styles.itemWrapper}>
			<FavoritesButton movieId={movie._id} />
			<Link href={getMovieUrl(movie.slug)}  className={styles.item}>
				<Image
					alt={movie.title}
					fill
					src={movie.bigPoster}
					draggable={false}
					priority
                   
				/>

				<span className={styles.title}>{movie.title}</span>
			</Link>
		</div>
	);
};
export default FavoritesItem;

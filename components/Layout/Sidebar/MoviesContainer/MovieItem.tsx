import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { IMovie } from '@shared/types/movie.types';
import { getGenreUrl, getMovieUrl } from '@/config/url.config';
import styles from './MovieList.module.scss';
import { getGenreListEach } from '@utils/movie/getGenreList';
import MaterialIcon from '@components/UI/MaterialIcon';

const MovieItem: FC<{ movie: IMovie }> = ({ movie }) => {
	return (
		<div className={styles.item}>
			<Link href={getMovieUrl(movie.slug)}>
				<Image
					src={movie.poster}
					width={65}
					height={97}
					draggable={false}
					alt={movie.title}
				/>
				<div className={styles.info}>
				<div>
					<div className={styles.title}>{movie.title}</div>
					<div className={styles.genres}>
						{movie.genres.slice(0,3).map((genre, idx) => (
							<span  key={genre._id}>
								{ genre.name}
							</span>
						))}
					</div>
				</div>

				<div className={styles.rating}>
					<MaterialIcon name="MdStarRate" />
					<span>{movie.rating.toFixed(1)}</span>
				</div>
			</div>
			</Link>
			
		</div>
	);
};
export default MovieItem;

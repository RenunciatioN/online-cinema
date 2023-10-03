import { FC } from 'react';
import { IMovieList } from './movie-list.interface';

import styles from './MovieList.module.scss';
import MovieItem from './MovieItem';
import Link from 'next/link';

const MovieList: FC<IMovieList> = ({ title, movies, link }) => {
	return (
		<div className={styles.list}>
			<div className={styles.heading}>{title}</div>
      {movies.slice(0, 3).map(movie => <MovieItem key={movie._id} movie={movie} />)}
      <Link href={link} className={styles.button}>
        Подробнее
      </Link>
		</div>
	);
};
export default MovieList;

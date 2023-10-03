import { IMovie } from '@shared/types/movie.types';
import { FC } from 'react';

import ContentList from './ContentList/ContentList';
import { getActorUrl, getGenreUrl } from '@/config/url.config';
import MaterialIcon from '@components/UI/MaterialIcon';

import styles from './Content.module.scss';
import FavoritesButton from '../FavoritesButton/FavoritesButton';

const Content: FC<{ movie: IMovie }> = ({ movie }) => {
	return (
		<div className={styles.content}>
			<h1>{movie.title}</h1>
			<div className={styles.details}>
				<span>{movie.parametrs.year} · </span>
				<span>{movie.parametrs.country} · </span>
				<span>{movie.parametrs.duration} мин </span>
			</div>

			<ContentList
				name="Жанры"
				links={movie.genres.slice(0, 3).map((g) => ({
					_id: g._id,
					link: getGenreUrl(g.slug),
					title: g.name,
				}))}
			/>
			<ContentList
				name="Актеры"
				links={movie.actors.slice(0, 3).map((a) => ({
					_id: a._id,
					link: getActorUrl(a.slug),
					title: a.name,
				}))}
			/>

			<div className={styles.rating}>
				<MaterialIcon name="MdStarRate" />
				<span>{movie.rating.toFixed(1)}</span>
			</div>

			<FavoritesButton movieId={movie._id} />
		</div>
	);
};
export default Content;

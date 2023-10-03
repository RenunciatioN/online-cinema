'use client';

import { FC, Fragment } from 'react';
import styles from './Favorites.module.scss';
import { useFavorites } from './useFavorites';
import SkeletonLoader from '@components/UI/SkeletonLoader';
import FavoritesItem from './FavoritesItem';
import Heading from '@components/UI/heading/Heading';

const Favorites: FC = () => {
	const { favoritesMovies, isInitialLoading } = useFavorites();

	return (
		<section className={styles.favorites}>
			<Heading title="Избранное" />
			<div className={styles.wrapper}>
			{isInitialLoading ? (
					<SkeletonLoader
						count={3}
						className={styles.skeletonLoader}
						containerClassName={styles.containerLoader}
					/>
				) : (
					favoritesMovies?.map((movie) => (
						<FavoritesItem key={movie._id} movie={movie} />
					))
				)}
			</div>
		</section>
	);
};
export default Favorites;

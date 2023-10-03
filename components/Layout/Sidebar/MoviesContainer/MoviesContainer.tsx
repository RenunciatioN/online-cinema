import { FC } from 'react';

import PopularMovies from './PopularMovies';

import styles from '../Sidebar.module.scss'

const MoviesContainer: FC<{ isHovered: boolean }> = ({ isHovered }) => {
	return (
		<div
			className={isHovered? styles.visible : styles.hidden}
		>
			<PopularMovies />
		</div>
	);
};

export default MoviesContainer;

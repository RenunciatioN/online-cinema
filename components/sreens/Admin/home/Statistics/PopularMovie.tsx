import { FC } from 'react';
import cn from 'classnames';

import styles from '../Admin.module.scss';
import { MovieService } from '@services/movie.service';
import { useQuery } from '@tanstack/react-query';
import { IMovie } from '@shared/types/movie.types';
import SubHeading from '@UI/heading/SubHeading';
import SkeletonLoader from '@components/UI/SkeletonLoader';
import Link from 'next/link';
import { getMovieUrl } from '@/config/url.config';
import Image from 'next/image';

const PopularMovie: FC = () => {
	const { isLoading, data: movie } = useQuery(
		['Most popular movie'],
		() => MovieService.getMostPopularMovies(),
		{
			select: (data): IMovie => data[0],
		}
	);

	return (
		<div className={cn(styles.block, styles.popular)}>
			<SubHeading title="Самый попурярный фильм" />

			{isLoading ? (
				<SkeletonLoader className="h-48" />
			) : (
				movie && (
					<>
						<h3>Открыт {movie.countOpened} раз</h3>
						<Link href={getMovieUrl(movie.slug)}>
							<Image
								src={movie.bigPoster}
								width={285}
								height={187}
								alt={movie.title}
								className={styles.image}
								unoptimized
							/>
						</Link>
					</>
				)
			)}
		</div>
	);
};
export default PopularMovie;

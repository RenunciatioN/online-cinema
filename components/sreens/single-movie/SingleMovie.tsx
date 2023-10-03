'use client';

import { FC } from 'react';
import dynamic from 'next/dynamic';

import Banner from '@UI/banner/Banner';
import SubHeading from '@UI/heading/SubHeading';
import Gallery from '@UI/gallery/Gallery';
import Content from './Content/Content';
import { useRenderClient } from '@hooks/useRenderClient';
import { IMoviePage } from './single-movie.interface';
import { useUpdateCountOpened } from './useUpdateCountOpened';
import AnimateProvider from '@/app/providers/AnimateProvider';

import styles from './SingleMovie.module.scss'

const DynamicVideoPlayer = dynamic(
	() => import('@UI/video-player/VideoPlayer')
);

const DynamicRating = dynamic(() => import('./RateMovie/RateMovie'));

const SingleMovie: FC<IMoviePage> = ({ movie, similarMovies }) => {
	const { isClientRender } = useRenderClient();
	useUpdateCountOpened(movie.slug);

	if (!isClientRender) return null;

	return (
		<AnimateProvider>
			<div className={styles.wrapper}>
				<Banner
					image={movie.bigPoster}
					Detail={() => <Content movie={movie} />}
					className={styles.banner }
				/>

				<AnimateProvider>
					<DynamicVideoPlayer slug={movie.slug} videoSources={movie.videoUrl} />
				</AnimateProvider>

				<div className={styles.description}>
					<p>
						{movie.description}
					</p>
				</div>

				<DynamicRating slug={movie.slug} id={movie._id} />
				<div className="mt-12">
					<SubHeading title="Смотрите также" />
					<Gallery items={similarMovies} />
				</div>

			</div>
		</AnimateProvider>
	);
};
export default SingleMovie;

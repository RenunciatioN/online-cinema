'use client';
import { useAuth } from '@hooks/useAuth';
import { FC } from 'react';
import { useRateMovie } from './useRateMovie';

import AuthButton from '@UI/video-player/AuthPlaceholder/AuthButton';
import StarRatings from 'react-star-ratings';

import styles from './RateMovie.module.scss';

interface IRateMovie {
	id: string;
	slug: string;
}

const RateMovie: FC<IRateMovie> = ({ slug, id }) => {
	const { user } = useAuth();
	const { handleClick, isSender, rating } = useRateMovie(id);

	return (
		<div className={styles.wrapper}>
			<h3>Вам понравился фильм?</h3>
			<p>Рейтинги улучшают рекомендации.</p>

			{!user ? (
				<AuthButton slug={slug} />
			) : (
				<>
					{isSender ? (
						<div className={styles.thanks}>Спасибо за оценку!</div>
					) : (
						<StarRatings
							rating={rating}
							changeRating={handleClick}
							numberOfStars={10}
							name="star-rating"
							starRatedColor="#FDDE55"
						/>
					)}
				</>
			)}
		</div>
	);
};
export default RateMovie;

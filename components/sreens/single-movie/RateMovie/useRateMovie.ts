import { useState } from 'react';
import { ReatingService } from '@services/rating.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toastError, toastSuccess } from '@utils/toast';
import { useAuth } from '@hooks/useAuth';

export const useRateMovie = (movieId: string) => {
	const [rating, setRating] = useState(0);
	const [isSender, setIsSender] = useState(false);
	const {user} = useAuth()

	const { refetch } = useQuery(
		['your movie rating', movieId],
		() => ReatingService.getByUserMovie(movieId),
		{
			onSuccess: ({ data }) => {
				setRating(data);
			},
			onError: (error) => {
				toastError(`Get rating movie - ${error}`);
			},
			enabled: !!movieId && !!user,
		}
	);

	const { mutateAsync } = useMutation(
		['set rating movie'],
		(value: number) => ReatingService.setRating(movieId, value),
		{
			onError: (error) => {
				toastError(`Update user - ${error}`);
			},
			onSuccess: () => {
				setIsSender(true);
				refetch();

				setTimeout(() => {
					setIsSender(false);
				}, 2400);
			},
		}
	);

	const handleClick = async (nextValue: number) => {
		setRating(nextValue);
		await mutateAsync(nextValue);
	};

	return {
		isSender,
		rating,
		handleClick,
	};
};

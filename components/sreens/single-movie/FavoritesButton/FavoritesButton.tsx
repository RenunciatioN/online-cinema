'use client';

import { FC, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import cn from 'classnames';

import { useFavorites } from '@sreens/Favorites/useFavorites';
import { UserService } from '@services/user.service';
import { toastError } from '@utils/toast';

import styles from './FavoritesButton.module.scss';

import HeartImage from '../../../../assets/images/heart-animation.png';
import { useAuth } from '@hooks/useAuth';

const FavoritesButton: FC<{ movieId: string }> = ({ movieId }) => {
	const { user } = useAuth();
	if (!user) return null;

	const [isSmashes, setIsSmashed] = useState(false);
	const { favoritesMovies, refetch } = useFavorites();

	useEffect(() => {
		if (!favoritesMovies) return;
		const isHasMovies = favoritesMovies.some((f) => f._id === movieId);
		if (isSmashes !== isHasMovies) setIsSmashed(isHasMovies);
	}, [favoritesMovies, isSmashes, movieId]);

	const { mutateAsync } = useMutation(
		['update y favorites'],
		() => UserService.toggleFavorites(movieId),
		{
			onError: (error) => {
				toastError(`Update favorites list - ${error}`);
			},
			onSuccess: () => {
				setIsSmashed(!isSmashes);
				refetch();
			},
		}
	);

	return (
		<button
			onClick={() => mutateAsync()}
			className={cn(styles.button, {
				[styles.animate]: isSmashes,
			})}
			style={{ backgroundImage: `url(${HeartImage.src})` }}
		/>
	);
};
export default FavoritesButton;

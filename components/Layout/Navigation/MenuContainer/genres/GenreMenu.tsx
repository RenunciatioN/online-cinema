'use client'

import { FC } from 'react';
import { useGenres } from './usePopularGenres';
import Menu from '../Menu';
import SkeletonLoader from '@components/UI/SkeletonLoader';

const GenreMenu: FC = () => {
	const { isLoading, data } = useGenres();

	return (
		<>
			{isLoading ? (
				<div className="mx-11 mb-8 "><SkeletonLoader count={3} className='h-7 mt-5' /></div>
			) : (
				<Menu menu={{ title: 'Популярные жанры', items: data || [] }} />
			)}
		</>
	);
};
export default GenreMenu;

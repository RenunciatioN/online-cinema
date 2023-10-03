'use client'

import { FC, useEffect, useState } from 'react';
import NotAuthFavorites from './NotAuthFavorites';
import { useAuth } from '@hooks/useAuth';


const FavoritesMovies:FC = () => {
  const [hydrated, setHydrated] = useState(false);
	const { user } = useAuth();

	useEffect(() => {
		setHydrated(true);
	}, []);

	if (!hydrated) return null;

  return !user && <NotAuthFavorites />
}
export default FavoritesMovies
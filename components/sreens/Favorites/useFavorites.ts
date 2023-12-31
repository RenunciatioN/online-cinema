import { useAuth } from '@hooks/useAuth';
import { UserService } from '@services/user.service';
import { useQuery } from '@tanstack/react-query';

export const useFavorites = () => {
	const {user} = useAuth()

	const {
		isInitialLoading,
		data: favoritesMovies,
		refetch,
	} = useQuery(['favorites movies'], () => UserService.getFavorites(), {
		select: ({ data }) => data,
		enabled: !!user
	});

	return {
		isInitialLoading,
		favoritesMovies,
		refetch,
	};
};

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '@hooks/useAuth';

export const useAuthRedirect = () => {
	const { user } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (user) router.back();
	}, [user, router]);
};

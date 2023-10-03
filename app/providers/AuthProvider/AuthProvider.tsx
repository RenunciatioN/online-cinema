'use client';

import { FC, useEffect } from 'react';
import { useAuth } from '@hooks/useAuth';
import { useActions } from '@hooks/useActions';
import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';
import CheckRole from './CheckRole/CheckRole';

interface Prop {
	authRoleAccess: 'admin' | 'user' | null;
	children: React.ReactNode;
	mainAdmin?: boolean;
}

const AuthProvider: FC<Prop> = ({ children, authRoleAccess, mainAdmin }) => {
	const { user } = useAuth();
	const { logout, checkAuth } = useActions();
	const pathname = usePathname();
	const router = useRouter();

	useEffect(() => {
		const accessToken = Cookies.get('accessToken');
		if (accessToken) checkAuth();
	}, []);

	useEffect(() => {
		const refreshToken = Cookies.get('refreshToken');
		if (!refreshToken && user) {
			logout();
			router.replace('/404');
		}
	}, [pathname]);

	return (
		<CheckRole authRoleAccess={authRoleAccess} mainAdmin={mainAdmin}>
			{children}
		</CheckRole>
	);
};
export default AuthProvider;

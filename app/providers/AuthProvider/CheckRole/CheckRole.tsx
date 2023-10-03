'use client';
import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@hooks/useAuth';
interface Prop {
	authRoleAccess: 'admin' | 'user' | null;
	children: React.ReactNode;
	mainAdmin?: boolean;
}

const CheckRole: FC<Prop> = ({ children, authRoleAccess, mainAdmin }) => {
	const { user } = useAuth();
	const router = useRouter();

	const Children = () => children;

	if (!authRoleAccess) return;
	if (user?.isAdmin) return <Children />;

	if (authRoleAccess === 'admin') {
		router.replace('/404');
		return null;
	}
	const isUser = user && !user?.isAdmin;

	if (isUser && authRoleAccess === 'user') {
		return <Children />;
	} else {
		router.replace('/auth?redirect');
		return null;
	}
};
export default CheckRole;

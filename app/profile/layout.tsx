import type { Metadata } from 'next';

import { titleMerge } from '@/config/seo.config';
import ProtectRoutesProvider from '../providers/AuthProvider/ProtectRoutesProvider';

export const metadata: Metadata = {
	title: `${titleMerge('Профиль')}`,
	description: 'Watch MovieApp movies and TV shows online',
	applicationName: 'Space Films',
	robots: 'noindex',
};

export default function ManageLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <ProtectRoutesProvider accessRole="user">{children}</ProtectRoutesProvider>;
}

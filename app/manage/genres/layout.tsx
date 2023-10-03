import type { Metadata } from 'next';

import { titleMerge } from '@/config/seo.config';

export const metadata: Metadata = {
	title: `${titleMerge('Жанры')}`,
	robots: 'noindex',
};

export default function ManageLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <> {children}</>;
}

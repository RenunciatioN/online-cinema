
import type { Metadata } from 'next';

import { titleMerge } from '@/config/seo.config';
import Layout from '@components/Layout/Layout';

export const metadata: Metadata = {
	title: `${titleMerge('Каталог жанров')}`,
	description: 'В этом разделе вы найдете все жанры, представленные на нашем сайте',
	applicationName: 'Space Films',
};

export default function ManageLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>
}

import type { Metadata } from 'next';

import { titleMerge } from '@/config/seo.config';
import MainProvider from './../providers/MainProvider';


export const metadata: Metadata = {
	title: `${titleMerge('Not Found')}`,
	description: 'Watch MovieApp movies and TV shows online',
	applicationName: 'Space Films',
    robots: 'noindex'
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<> {children}</>
	);
}

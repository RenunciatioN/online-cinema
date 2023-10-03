import type { Metadata } from 'next';

import MainProvider from './providers/MainProvider';
import { ReduxProvider } from './providers/ReduxProvider';
import NextAuthProvider from './providers/NextAuthProvider';
import { titleMerge } from '@/config/seo.config';

import Layout from '@components/Layout/Layout';

import './globals.scss';
import 'react-toastify/dist/ReactToastify.css';
import 'react-tooltip/dist/react-tooltip.css';

export const metadata: Metadata = {
	title: `${titleMerge('Главная')}`,
	description: 'Watch MovieApp movies and TV shows online',
	applicationName: 'Space Films',
	manifest: '/manifest.json',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ru">
			<body>
					<NextAuthProvider>
				<ReduxProvider>
						<MainProvider>
							<Layout>{children}</Layout>
						</MainProvider>
				</ReduxProvider>
					</NextAuthProvider>
			</body>
		</html>
	);
}

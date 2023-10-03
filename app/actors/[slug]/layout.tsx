
import type { Metadata } from 'next';

import { titleMerge } from '@/config/seo.config';

export const metadata: Metadata = {
	title: `${titleMerge('')}`,
	description: 'Новые фильмы и и сериалы в отличном качестве: легально, безопасно, без рекламы',
	applicationName: 'Space Films',
};

export default function ManageLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>
}

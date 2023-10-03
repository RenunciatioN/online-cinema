'use client';

import { FC } from 'react';
import { usePathname } from 'next/navigation';
import cn from 'classnames';

import styles from './Menu.module.scss';
import { IMenuItem } from './menu.interface';
import Link from 'next/link';
import MaterialIcon from '@components/UI/MaterialIcon';

const MenuItem: FC<{ item: IMenuItem }> = ({ item }) => {
	const pathname = usePathname();

	return (
		<li
			className={cn({
				[styles.active]: pathname === item.link,
			})}
		>
			<Link href={item.link}>
				<MaterialIcon name={item.icon} />
				<span>{item.title}</span>
			</Link>
		</li>
	);
};
export default MenuItem;

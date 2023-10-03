import { FC } from 'react';
import Menu from './Menu';
import { firstMenu } from './menu.data';
import GenreMenu from './genres/GenreMenu';

const MenuContainer: FC = () => {
	return (
		<div>
			<Menu menu={firstMenu} />
			<GenreMenu />
			<Menu menu={{ title: 'General', items: [] }} />
		</div>
	);
};

export default MenuContainer;

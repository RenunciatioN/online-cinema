'use client';


import {FC, useEffect, useState } from "react";
import { useAuth } from '@hooks/useAuth';
import MenuItem from '../MenuItem';
import LogoutButton from './LogoutButton';
import { getAdminHomeUrl } from '@/config/url.config';
import React from 'react';

const AuthItems: FC = () => {
	const [isClientRender, setIsClientRender] = useState(false);
	const { user } = useAuth();


	useEffect(() => {
		setIsClientRender(true);
	}, []);

	if (!isClientRender) return null


	return (
		<>
		
			{user ? (
				<>
					{user?.isAdmin && (
						<MenuItem
							item={{
								icon: 'MdOutlineLock',
								link: getAdminHomeUrl(),
								title: 'Админ панель',
							}}
						/>
					)}
					<MenuItem
						item={{ icon: 'MdSettings', link: '/profile', title: 'Профиль' }}
					/>
					<MenuItem item={{ icon: 'MdFavorite', link: '/favorites', title: 'Избранное' }} />

					<LogoutButton />
				</>
			) : (
				<MenuItem item={{ icon: 'MdLogin', link: '/auth', title: 'Войти' }} />
			)}
		</>
	);
};
export default AuthItems;

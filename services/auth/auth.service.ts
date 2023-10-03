import Cookies from 'js-cookie';

import { axiosClassic } from '@/app/api/interceptors';
import { getAuthUrl } from '@/config/api.config';
import { IAuthResponse } from '@store/user/user.inteface';
import { removeToekensStorage, saveToStorage } from './auth.helpers';
import { getContentType } from '@/app/api/api.helpers';

export const AuthService = {
	async register(email: string, password: string) {
		const response = await axiosClassic.post<IAuthResponse>(
			getAuthUrl('/register'),
			{ email, password }
		);
		console.log(response);

		if (response.data.accessToken) {
			//save to cookie
			saveToStorage(response.data);
		}

		return response;
	},

	async login(email: string, password: string) {
		const response = await axiosClassic.post<IAuthResponse>(
			getAuthUrl('/login'),
			{ email, password }
		);

		if (response.data.accessToken) {
			//save to cookie
			saveToStorage(response.data);
		}

		return response;
	},

	async getNewTokens() {
		const refreshToken = Cookies.get('refreshToken');
		const response = await axiosClassic.post<IAuthResponse>(
			getAuthUrl('/login/access-token'),
			{ refreshToken },
			{ headers: getContentType() }
		);

		if (response.data.accessToken) {
			//save to cookie
			saveToStorage(response.data);
		}

		return  response
	},

	async logout() {
		removeToekensStorage();
		localStorage.removeItem('user');

		console.log('logout');
		
		
	},
};

import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { IEmailPassword, IAuthResponse } from './user.inteface';
import { AuthService } from '@services/auth/auth.service';
import { toastError } from '@utils/toast';
import { errorCatch } from '@/app/api/api.helpers';

export const register = createAsyncThunk<IAuthResponse, IEmailPassword>(
	'auth/register',
	async ({ email, password }, thunkApi) => {
		try {
			const response = await AuthService.register(email, password);
			const toastId = 'auth-register-id';
			toast.success('Успешная регистрация', {
				style: { background: '#1F2125' },
				toastId,
			});

			return response.data;
		} catch (error) {
			toastError(error);
			return thunkApi.rejectWithValue(error);
		}
	}
);

export const login = createAsyncThunk<IAuthResponse, IEmailPassword>(
	'auth/login',
	async ({ email, password }, thunkApi) => {
		try {
			const response = await AuthService.login(email, password);
			const toastId = 'auth-login-id';
			toast.success('Успешная авторизация', {
				style: { background: '#1F2125' },
				toastId,
			});

			return response.data;
		} catch (error) {
			toastError(error);
			return thunkApi.rejectWithValue(error);
		}
	}
);

export const logout = createAsyncThunk('auth/logout', async () => {
	await AuthService.logout();
});

export const checkAuth = createAsyncThunk<IAuthResponse>(
	'auth/check-auth',
	async (_, thunkApi) => {
		try {
			const response = await AuthService.getNewTokens();

			return response.data;
		} catch (error) {
			if (errorCatch(error) === 'jwt expired') {
				toastError(
					'Выход',
					'Ваша авторизация завершена, пожалуйста, войдите в систему снова'
				);

				thunkApi.dispatch(logout()); 
			}

			return thunkApi.rejectWithValue(error);
		}
	}
);

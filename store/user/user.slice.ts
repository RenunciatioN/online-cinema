import { createSlice } from '@reduxjs/toolkit';
import { IInitialState } from './user.inteface';
import { getStoreLocal } from '@utils/local-storage';
import { checkAuth, login, logout, register } from './user.actions';

const initialState: IInitialState = {
	isLoading: false,
	user: getStoreLocal('user'),
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false;
                state.user = action.payload.user
			})
			.addCase(register.rejected, (state) => {
				state.isLoading = false;
                state.user = null
			})
            .addCase(login.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
                state.user = action.payload.user
			})
			.addCase(login.rejected, (state) => {
				state.isLoading = false;
                state.user = null
			})
            .addCase(logout.fulfilled, (state, action) => {
				state.isLoading = false;
                state.user = null
			})
            .addCase(checkAuth.fulfilled, (state, action) => {
				state.isLoading = false;
                state.user = action.payload.user
			})
	},
});

export const { reducer } = userSlice;

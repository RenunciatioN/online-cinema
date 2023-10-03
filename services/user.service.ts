import axios from '@/app/api/interceptors';
import { getUsersUrl } from '@/config/api.config';
import { IUser } from '@shared/types/user.types';
import { IProfileInput } from './../components/sreens/Profile/profile.interface';
import { IMovie } from '@shared/types/movie.types';

export const UserService = {
	async getAll(searchTerm?: string) {
		return axios.get<IUser[]>(getUsersUrl(''), {
			params: searchTerm ? { searchTerm } : {},
		});
	},
	async getProfile() {
		return axios.get<IUser>(getUsersUrl('/profile'));
	},

	async getByid(id: string) {
		return axios.get<IUser>(getUsersUrl(`/${id}`));
	},
	async update(id: string, data: IProfileInput) {
		return axios.put<string>(getUsersUrl(`/${id}`), data);
	},
	async updateProfile(data: IProfileInput) {
		return axios.put<string>(getUsersUrl('/profile'), data);
	},

	async delete(id: string) {
		return axios.delete<string>(getUsersUrl(`/${id}`));
	},
	
	//Favorites
	async getFavorites() {
		return axios.get<IMovie[]>(getUsersUrl('/profile/favorites'));
	},
	async toggleFavorites(movieId: string) {
		return axios.put(getUsersUrl('/profile/favorites'), {
			movieId,
		});
	},
};

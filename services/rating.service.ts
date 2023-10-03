import axios from '@/app/api/interceptors';
import { getRatingsUrl, getUsersUrl } from '@/config/api.config';

export const ReatingService = {
	async setRating(movieId: string, value: number) {
		return axios.post<string>(getRatingsUrl('/set-rating'), {
			movieId,
			value,
		});
	},
	async getByUserMovie(movieId: string) {
		return axios.get<number>(getRatingsUrl(`/${movieId}`));
	},
};

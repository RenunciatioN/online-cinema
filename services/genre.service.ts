import axios, { axiosClassic } from '@/app/api/interceptors';
import { getGenresUrl } from '@/config/api.config';
import { IGenre } from '@shared/types/movie.types';
import { IGenreEditInput } from '../components/sreens/Admin/genres/genre-edit/genre-edit.interface';
import { ICollection } from '@components/sreens/genres/collections.interface';

export const GenreService = {
	async getAll(searchTerm?: string) {
		return axiosClassic.get<IGenre[]>(getGenresUrl(''), {
			params: searchTerm ? { searchTerm } : {},
		});
	},
	async getCollections() {
		return axiosClassic.get<ICollection[]>(getGenresUrl('/collections'));
	},
	async getByid(id: string) {
		return axios.get<IGenreEditInput>(getGenresUrl(`/${id}`));
	},
	async getBySlug(slug: string) {
		return axiosClassic.get<IGenre>(getGenresUrl(`/by-slug/${slug}`));
	},
	async create () {
        return axios.post<string>(getGenresUrl('/'));
    },

	async update (id: string, data: IGenreEditInput) {
        return axios.put<string>(getGenresUrl(`/${id}`),data);
    },

	async delete (id: string) {
        return axios.delete<string>(getGenresUrl(`/${id}`));
    }
};

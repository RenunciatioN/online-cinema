import axios, { axiosClassic } from '@/app/api/interceptors';
import { getActorsUrl } from '@/config/api.config';
import { IActorEditInput } from '@components/sreens/Admin/actors/actor-edit/actor-edit.interface';
import { IActor } from '@shared/types/movie.types';

export const ActorService = {
	async getAll(searchTerm?: string) {
		return axiosClassic.get<IActor[]>(getActorsUrl('/'), {
			params: searchTerm ? { searchTerm } : {},
		});
	},

	async getById(id: string) {
		
		return axios.get<IActorEditInput>(getActorsUrl(`/${id}`));
	},
	async getBySlug(slug: string) {
		return axiosClassic.get<IActor>(getActorsUrl(`/by-slug/${slug}`));
	},

	async create () {
        return axios.post<string>(getActorsUrl('/'));
    },

	async update (id: string, data: IActorEditInput) {
        return axios.put<string>(getActorsUrl(`/${id}`),data);
    },

	async delete(id: string) {
        return axios.delete<string>(getActorsUrl(`/${id}`));
    }
};

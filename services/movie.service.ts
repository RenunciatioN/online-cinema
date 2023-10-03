import axios, { axiosClassic } from '@/app/api/interceptors';
import { getMoviesUrl } from '@/config/api.config';
import { IMovieEditInput } from '@components/sreens/Admin/movies/movie-edit/movie-edit.interface';
import { IMovie } from '@shared/types/movie.types';

export const MovieService = {
	async getAll(searchTerm?: string) {
		return axiosClassic.get<IMovie[]>(getMoviesUrl('/'), {
			params: searchTerm ? { searchTerm } : {},
		});
	},

	async getByid(id: string) {
		return axios.get<IMovieEditInput>(getMoviesUrl(`/${id}`));
	},
	async getBySlug(slug: string) {
		return axios.get<IMovie>(getMoviesUrl(`/by-slug/${slug}`));
	},

	async getByGenres(genreIDs: string[]) {
		return axios.post<IMovie[]>(getMoviesUrl(`/by-genres`), {
			genreIDs,
		});
	},

	async getByActor(actorId: string) {
		return axios.get<IMovie[]>(getMoviesUrl(`/by-actor/${actorId}`));
	},

	async getMostPopularMovies() {
		const { data: movies } = await axiosClassic.get<IMovie[]>(
			getMoviesUrl('/most-popular')
		);

		return movies;
	},

	async create() {
		return axios.post<string>(getMoviesUrl('/'));
	},

	async update(id: string, data: IMovieEditInput) {
		return axios.put<string>(getMoviesUrl(`/${id}`), data);
	},

	async delete(id: string) {
		return axios.delete<string>(getMoviesUrl(`/${id}`));
	},

	async updateCountOpened(slug: string) {
		return axios.put<string>(getMoviesUrl(`/update-count-opened`), { slug });
	},
};

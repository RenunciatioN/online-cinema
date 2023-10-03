import Genres from '@components/sreens/genres/Genres';
import { ICollection } from '@components/sreens/genres/collections.interface';
import { GenreService } from '@services/genre.service';
import { MovieService } from '@services/movie.service';

import { FC } from 'react';

interface IResponcePromise extends ICollection {
	status: string;
	value: ICollection;
}
async function getData() {
	try {
		const { data: genresList } = await GenreService.getAll();

		if (!genresList) {
			throw new Error('Failed to fetch data');
		}

		const collections = await Promise.allSettled(
			genresList.map(async (genre) => {
				const { data: moviesByGenre } = await MovieService.getByGenres([
					genre._id,
				]);

				const result: ICollection = {
					_id: String(genre._id),
					title: genre.name,
					slug: genre.slug,
					image: moviesByGenre[0].bigPoster,
				};

				return result;
			})
		);

		const result = collections
			.filter((item) => item.status === 'fulfilled')
			.map(({ value }: any) => ({
				_id: String(value._id),
				title: value.title,
				slug: value.slug,
				image: value.image,
			}));

		return result;
	} catch (error) {}
}

const GenresPage: FC = async () => {
	const collections = await getData();

	if (!collections) return null

	return <Genres collections={collections || []} />;

};
export default GenresPage;

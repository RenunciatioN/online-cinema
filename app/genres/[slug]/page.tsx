import { NextPage } from 'next/types';

import Catalog from '@components/UI/catalog-movies/Catalog';
import { MovieService } from '@services/movie.service';
import { GenreService } from '@services/genre.service';
import { IGenre, IMovie } from '@shared/types/movie.types';

interface IGenrePage {
	params: {
		slug: string;
	};
}
interface IData {
	genre: IGenre;
	movies: IMovie[];
}

async function getData(slug: string): Promise<IData | undefined> {
	try {
		const { data: genre } = await GenreService.getBySlug(String(slug));

		if (!genre) return;

		const { data: movies } = await MovieService.getByGenres([genre._id]);

		if (!movies) return;

		return { genre, movies };
	} catch (error) {
		return
	}
}

const GenrePage: NextPage<IGenrePage> = async ({ params }) => {
	const data = await getData(params.slug);

	return data ? (
		<Catalog
			movies={data.movies || []}
			title={data.genre?.name}
			
		/>
	) : (
		<div className="text-2xl">Фильмов в этой категории не найдено</div>
	);
};

export default GenrePage;

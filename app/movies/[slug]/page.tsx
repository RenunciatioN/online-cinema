import { NextPage } from 'next/types';
import type { Metadata } from 'next';

import { MovieService } from '@services/movie.service';

import SingleMovie from '@components/sreens/single-movie/SingleMovie';
import { IGalleryItem } from '@components/UI/gallery/gallery.interface';
import { getMovieUrl } from '@/config/url.config';

interface IMoviePage {
	params: {
		slug: string;
	};
}

async function getData(slug: string) {
	try {
		const { data: movie } = await MovieService.getBySlug(String(slug));

		if (!movie) return;

		const { data: dataSimilarMovie } = await MovieService.getByGenres(
			movie.genres.map((genre) => genre._id)
		);

		const similarMovies: IGalleryItem[] = dataSimilarMovie
			.filter((m) => m._id !== movie._id)
			.map((m) => ({
				name: m.title,
				posterPath: m.poster,
				link: getMovieUrl(m.slug),
			}));

		return { movie, similarMovies };
	} catch (error) {
		return;
	}
}

export async function  generateMetadata({
	params,
}: IMoviePage): Promise<Metadata | undefined>   {
	const data = await getData(params.slug);

	if (!data) return

	return {
		title: data?.movie.title,
		
	};
}
const MoviePage: NextPage<IMoviePage> = async ({ params }) => {
	const data = await getData(params.slug);

	return data ? (
		<SingleMovie movie={data.movie} similarMovies={data.similarMovies} />
	) : (
		<div className="text-2xl">Фильм не найден</div>
	);
};

export default MoviePage;

import { NextPage } from 'next/types';
import { getServerSession } from 'next-auth/next';

import Home from '@components/sreens/Home/Home';
import { MovieService } from '@services/movie.service';
import { ISlide } from '@components/UI/slider/sllider.interface';
import { getActorUrl, getMovieUrl } from '@/config/url.config';
import { getGenreList } from '@utils/movie/getGenreList';

import { IGalleryItem } from '@components/UI/gallery/gallery.interface';
import { ActorService } from '@services/actor.service';
import { authConfig } from '@/config/next-auth.config';

export const revalidate = 60;

async function getData() {
	try {
		const { data: movies } = await MovieService.getAll();

		if (!movies) {
			throw new Error('Failed to fetch data');
		}

		const slides: ISlide[] = movies.slice(0, 4).map((m) => ({
			_id: m._id,
			link: getMovieUrl(m.slug),
			bigPoster: m.bigPoster,
			subTitle: getGenreList(m.genres),
			title: m.title,
		}));

		
		if (!slides) return;

		const { data: dataActors } = await ActorService.getAll();
		const actors: IGalleryItem[] = dataActors.slice(0, 7).map((a) => ({
			name: a.name,
			posterPath: a.photo,
			link: getActorUrl(a.slug),
			content: {
				title: a.name,
			},
		}));

		if (!actors) return;

		const dataTrendingMovies = await MovieService.getMostPopularMovies();
		const trendingMovies: IGalleryItem[] = dataTrendingMovies
			.slice(0, 7)
			.map((m) => ({
				name: m.title,
				posterPath: m.poster,
				link: getMovieUrl(m.slug),
				content: {
					title: m.title,
				},
			}));

		const data = { slides, trendingMovies, actors };

		return data;
	} catch (error) {
		// throw new Error('Failed to fetch data');
	}
}

const HomePage: NextPage = async () => {
	const data = await getData();
	const session = await getServerSession(authConfig)

	// if (session) console.log(session.user);
	
	

	if (!data) return null;

	return (
		<Home
			slides={data.slides}
			trendingMovies={data.trendingMovies}
			actors={data.actors}
		/>
	);
};

export default HomePage;

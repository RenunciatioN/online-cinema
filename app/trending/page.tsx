import { NextPage } from 'next/types';


import Catalog from '@components/UI/catalog-movies/Catalog';
import { MovieService } from '@services/movie.service';

async function getData() {
	try {
		const movies = await MovieService.getMostPopularMovies();

		if (!movies) throw new Error('Failed to fetch data');
		
		return movies;
	} catch (error) {
		
	}
}

const TrendingPage: NextPage = async () => {
	const movies = await getData();
	
	

	return (
		<Catalog
			movies={movies || []}
			title="В тренде"
			description="Новые фильмы и и сериалы в отличном качестве: легально, безопасно, без рекламы"
		/>
	);
};

export default TrendingPage;

import { NextPage } from 'next/types';

import Catalog from '@components/UI/catalog-movies/Catalog';
import { MovieService } from '@services/movie.service';
import SkeletonLoader from '@components/UI/SkeletonLoader';

async function getData() {
	try {
		const { data: movies } = await MovieService.getAll();

		if (!movies) {
			throw new Error('Failed to fetch data');
		}

		return movies;
	} catch (error) {
		throw error;
	}
}

const FreshPage: NextPage = async () => {
	const movies = await getData();

	if (!movies) return null

	return (
		<>
			<Catalog
				movies={movies || []}
				title="Свежие фильмы"
				description="Новые фильмы и и сериалы в отличном качестве: легально, безопасно, без рекламы"
			/>
		</>
	);
};

export default FreshPage;

import { NextPage } from 'next/types';

import Catalog from '@components/UI/catalog-movies/Catalog';
import { MovieService } from '@services/movie.service';
import { ActorService } from '@services/actor.service';
import { IActor, IMovie } from '@shared/types/movie.types';

interface IActorPage {
	params: {
		slug: string;
	};
}
interface IData {
	actor: IActor;
	movies: IMovie[];
}

async function getData(slug: string): Promise<IData | undefined> {
	try {
		const { data: actor } = await ActorService.getBySlug(String(slug));

		if (!actor) return;

		const { data: movies } = await MovieService.getByActor(actor._id);

		if (!movies) return;

		const data = { actor, movies };

		return data;
	} catch (error) {
		return;
	}
}

const ActorPage: NextPage<IActorPage> = async ({ params }) => {
	const data = await getData(params.slug);

	return data ? (
		<Catalog movies={data.movies || []} title={data.actor?.name} />
	) : (
		<div className="text-2xl">Фильмов в c этим актером не найдено</div>
	);
};

export default ActorPage;

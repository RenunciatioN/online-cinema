import { FC } from 'react';
import { IHome } from './home.interface';
import Heading from '@components/UI/heading/Heading';
import Slider from '@components/UI/slider/Slider';
import SubHeading from '@components/UI/heading/SubHeading';
import Gallery from '@components/UI/gallery/Gallery';
import AnimateProvider from '@/app/providers/AnimateProvider';

const Home: FC<IHome> = ({ slides, trendingMovies, actors }) => {
	return (
		<AnimateProvider>
			{/* <Heading title="Смотреть фильмы онлайн" /> */}

			{slides.length && <Slider slides={slides} />}

			<div className="my-10">
				<SubHeading title="Популярное сейчас" />

				{trendingMovies.length && <Gallery items={trendingMovies} />}
			</div>

			<div>
				<SubHeading title="Лучшие актеры" />
				{actors.length && <Gallery items={actors} />}
			</div>
		</AnimateProvider>
	);
};

export default Home;

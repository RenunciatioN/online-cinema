import { FC } from 'react';
import { ICatalog } from './catalog.interface';
import Heading from '../heading/Heading';
import Desription from '../heading/Description';

import GalleryItem from '../gallery/GalleryItem';
import { getMovieUrl } from '@/config/url.config';

import styles from './Catalog.module.scss';

const Catalog: FC<ICatalog> = ({ movies, title, description }) => {
	return (
		<div>
			<Heading title={title} className={styles.heading} />

			{description && (
				<Desription text={description} className={styles.descripion} />
			)}

			<section className={styles.movies}>
				{movies.map((movie) => (
					<GalleryItem
						key={movie._id}
						item={{
							name: movie.title,
							link: getMovieUrl(movie.slug),
							posterPath: movie.bigPoster,
							content: {
								title: movie.title,
							},
						}}
						variant="horizontal"
					/>
				))}
			</section>
		</div>
	);
};
export default Catalog;

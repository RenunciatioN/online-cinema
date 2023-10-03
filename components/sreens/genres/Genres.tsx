import { FC } from 'react';
import Heading from '@components/UI/heading/Heading';
import CollectionItem from './GenresItem';

import { ICollection } from './collections.interface';

import styles from './Genres.module.scss';

const Genres: FC<{ collections: ICollection[] }> = ({ collections }) => {
	return (
		<section>
			<Heading title="Каталог жанров" className={styles.heading} />

			<div className={styles.collections}>
				{collections.map((collection) => (
					<CollectionItem key={collection._id} collection={collection} />
				))}
			</div>
		</section>
	);
};
export default Genres;

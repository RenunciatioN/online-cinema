import { FC } from 'react';
import { ICollection } from './collections.interface';
import Image from 'next/image';

const GenreImage: FC<{ collection: ICollection }> = ({
	collection: { image, title },
}) => {
	return <Image src={image} fill draggable={false} alt={title} />;
};
export default GenreImage;

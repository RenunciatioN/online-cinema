import Link from 'next/link';
import { FC } from 'react';

const NotAuthFavorites: FC = () => {
	return (
		<div className="mt11 bg-gray-600 bg-opacity-20 mt-8 py-3 px-5 rounded-lg text-white text-opacity-80">
			Для просмотра избранного, 
			<Link href={'/auth'}>
				<span className='flex text-yellow-700 hover:opacity-70'>авторизуйтесь</span>
			</Link>
		</div>
	);
};
export default NotAuthFavorites;

import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import logoImage from '@assets/images/logo.png';

const Logo: FC = () => {
	return (
		<Link href="/">
			<div className="flex gap-2 items-center px-layout mb-10  font-semibold text-2xl">
				<Image
					src={logoImage}
					alt="Space films"
					width={32}
					height={32}
					draggable={false}
				/>

				SPACE FILMS
			</div>
		</Link>
	);
};

export default Logo;

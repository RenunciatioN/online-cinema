'use client';

import { FC} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const AnimateProvider: FC<{ children: React.ReactNode }> = ({ children }) => {

	const pathname = usePathname();



	return (
		<AnimatePresence mode="wait">
			<motion.div
				key={pathname}
				initial="initialState"
				animate="animateState"
				exit="exitState"
				transition={{ duration: 1.3, delay: 0.2 }}
				variants={{
					initialState: {
						opacity: 0,
					},
					animateState: {
						opacity: 1,
					},
				}}
				
			>{children}</motion.div>
			
		</AnimatePresence>
	);
};
export default AnimateProvider;

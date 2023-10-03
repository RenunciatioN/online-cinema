'use client';

import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import cn from 'classnames';

import styles from './Sidebar.module.scss';
import Search from './Search/Search';
import MoviesContainer from './MoviesContainer/MoviesContainer';
import MaterialIcon from '@components/UI/MaterialIcon';

const sidebarAnimation = {
	hidden: {
		x: 300,
		transition: { duration: 1 },
	},
	visible: {
		x: 0,
		transition: { duration: 0.6 },
	},
};

const Sidebar: FC = () => {
	const [isHovered, setHovered] = useState(false);

	return (
		<motion.div
			initial="hidden"
			whileHover="visible"
			variants={sidebarAnimation}
			className={styles.sidebar}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			<Search isHovered={isHovered} />
			<MoviesContainer isHovered={isHovered} />

			<div className={cn(styles.arrow, isHovered ? styles.hidden : '')}>
				<MaterialIcon name="MdKeyboardDoubleArrowLeft" />
			</div>
		</motion.div>
	);
};

export default Sidebar;

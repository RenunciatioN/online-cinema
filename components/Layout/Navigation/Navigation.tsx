'use client';

import {FC, useState} from 'react'
import { motion } from 'framer-motion';
import cn from 'classnames';

import styles from './Navigation.module.scss'
import Logo from './Logo'
import MenuContainer from './MenuContainer/MenuContainer'
import MaterialIcon from '@components/UI/MaterialIcon';

const navAnimation = {
	hidden: {
		x: -300,
		transition: { duration: 1 },
	},
	visible: {
		x: 0,
		transition: { duration: 0.6 },
	},
};

const Navigation:FC = () => {
	const [isHovered, setHovered] = useState(false);

  return (
    <motion.div initial="hidden"
        whileHover="visible"
        variants={navAnimation} className={styles.navigation}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
    >
      <Logo />
      <MenuContainer />

      <div className={cn(styles.arrow, isHovered ? styles.hidden : '')}>
        <MaterialIcon name='MdKeyboardDoubleArrowRight' />
      </div>


    </motion.div>
  )
}

export default Navigation
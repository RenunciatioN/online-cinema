'use client';

import { FC, useRef } from 'react';
import { ISlide } from './sllider.interface';
import { useSlider } from './useSlider';
import { CSSTransition } from 'react-transition-group';

import styles from './Slider.module.scss';
import SlideArrow from './SlideArrow/SlideArrow';
import SlideItem from './SlideItem';

interface ISlider {
	slides: ISlide[];
	buttonTitle?: string;
}
const Slider: FC<ISlider> = ({ slides, buttonTitle }) => {
	const { handleClick, index, isNext, isPrev, slideIn } = useSlider(
		slides.length
	);
	const nodeRef = useRef(null);

	return (
		<div className={styles.slider}>
			{isPrev && (
				<SlideArrow variant="left" clickHanlder={() => handleClick('prev')} />
			)}

			<CSSTransition
				nodeRef={nodeRef}
				in={slideIn}
				classNames="slide-animation"
				timeout={600}
				unmountOnExit
			>
				<div ref={nodeRef}><SlideItem slide={slides[index]} buttonTitle={buttonTitle} /></div>
			</CSSTransition>

			{isNext && (
				<SlideArrow variant="right" clickHanlder={() => handleClick('next')} />
			)}
		</div>
	);
};
export default Slider;

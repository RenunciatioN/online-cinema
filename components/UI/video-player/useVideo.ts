import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { IVideoElement } from './video.interface';

export const useVideo = () => {
	const videoRef = useRef<IVideoElement>(null);

	const [isPlaying, setIsPlaying] = useState(false);
	const [isMuted, setIsMuted] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [videoTime, setVideoTime] = useState(0);
	const [progress, setProgress] = useState(0);

	
	//Отслеживание длительности видео
	useEffect(() => {
		const originalDuration = videoRef.current?.duration;

		if (originalDuration) {
			setVideoTime(originalDuration);
		}
	}, [videoRef.current?.duration]);

	//Старт и пауза видео
	const toggleVideo = useCallback(() => {
		if (!isPlaying) {
			videoRef.current?.play();
			setIsPlaying(true);
		} else {
			videoRef.current?.pause();
			setIsPlaying(false);
		}
	}, [isPlaying]);

	//Sound on -off
	const soundToggle = useCallback(() => {
		if (!isMuted) {
			// videoRef.current?.muted
			setIsMuted(true);
		} else {
			// videoRef.current?;
			setIsMuted(false);
		}
	}, [isMuted]);

	//Перемотка видео
	const forward = () => {
		if (videoRef.current) videoRef.current.currentTime += 10;
	};
	const revert = () => {
		if (videoRef.current) videoRef.current.currentTime -= 10;
	};

	// Полноэкранный режим и  Адаптация под браузеры
	const fullSreen = () => {
		const video = videoRef.current;

		if (!video) return;

		if (video.requestFullscreen) {
			video.requestFullscreen();
		} else if (video.msRequestFullscreen) {
			video.msRequestFullscreen();
		} else if (video.webkitRequestFullscreen) {
			video.webkitRequestFullscreen();
		} else if (video.mozRequestFullscreen) {
			video.mozRequestFullscreen();
		}
	};

	//Прогресс бар
	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const updateProgress = () => {
			setCurrentTime(video.currentTime);
			setProgress((video.currentTime / videoTime) * 100);
		};

		video.addEventListener('timeupdate', updateProgress);

		return () => {
			video.removeEventListener('timeupdate', updateProgress);
		};
	}, [videoTime]);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			e.preventDefault();

			switch (e.key) {
				case 'ArrowRight':
					forward();
					break;
				case 'ArrowLeft':
					revert();
					break;
				case ' ': {
					e.preventDefault();
					toggleVideo();
					break;
				}
				case 'f':
					fullSreen();
					break;

				default:
					return;
			}
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [toggleVideo]);


	useEffect(() => {
		document.addEventListener("dblclick", fullSreen);

		return () => {
			document.removeEventListener("dblclick", fullSreen);
		}
	}, [toggleVideo])

	return useMemo(
		() => ({
			videoRef,
			actions: {
				fullSreen,
				revert,
				forward,
				toggleVideo,
				soundToggle,
			},
			video: {
				isPlaying,
				currentTime,
				progress,
				videoTime,
				isMuted,
			},
		}),
		[currentTime, progress, videoTime, isPlaying]
	);
};

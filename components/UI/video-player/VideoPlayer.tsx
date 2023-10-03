'use client';

import { FC, MouseEvent } from 'react';
import cn from 'classnames';

import { IVideoPlayer } from './video.interface';

import { useVideo } from './useVideo';
import { useAuth } from '@hooks/useAuth';
import AuthPlaceholder from './AuthPlaceholder/AuthPlaceholder';
import MaterialIcon from '../MaterialIcon';
import { useRenderClient } from '@hooks/useRenderClient';

import styles from './VideoPlayer.module.scss';

// const qualityList = { fullHD: '1080p', '720p': '720p', '360p': '360p' };

const VideoPlayer: FC<IVideoPlayer> = ({ slug, videoSources }) => {
	const { actions, video, videoRef } = useVideo();
	const { user } = useAuth();
	const { isClientRender } = useRenderClient();
	// const [currentQuality, setCurrentQuality] = useState('fullHD');

	if (!isClientRender) return;

	const clickHandler = (e: MouseEvent<HTMLVideoElement>) => {
		console.log(e.target)
		actions.toggleVideo()
	};

	return (
		<div
			className={cn(styles.wrapper, {
				'h-96': !user,
			})}
		>
			{user ? (
				<>
					<video
						ref={videoRef}
						src={`${videoSources}#t=8`}
						preload="metadata"
						onClick={(e) => clickHandler(e)}
					/>
					<div className={styles.progressBarContainer}>
						<div
							style={{ width: `${video.progress}%` }}
							className={styles.progressBar}
						/>
					</div>
					<div className={styles.controls}>
						<div>
							<button onClick={actions.revert}>
								<MaterialIcon name="MdHistory" />
							</button>

							<button
								onClick={actions.toggleVideo}
								className={styles.playButton}
							>
								<MaterialIcon
									name={video.isPlaying ? 'MdPause' : 'MdPlayArrow'}
								/>
							</button>

							<button onClick={actions.forward}>
								<MaterialIcon name="MdUpdate" />
							</button>
							{/* 
							<button onClick={actions.soundToggle}>
								<MaterialIcon name={video.isMuted ? 'MdVolumeOff' : 'MdVolumeUp'} />
							</button> */}

							<div className={styles.timeControls}>
								<p className={styles.controlsTime}>
									{Math.floor(video.currentTime / 60) +
										':' +
										('0' + Math.floor(video.currentTime % 60)).slice(-2)}
								</p>
								<p> / </p>
								<p className={styles.controlsTime}>
									{Math.floor(video.videoTime / 60) +
										':' +
										('0' + Math.floor(video.videoTime % 60)).slice(-2)}
								</p>
							</div>
						</div>

						<div>
							<button onClick={actions.fullSreen}>
								<MaterialIcon name="MdFullscreen" />
							</button>
						</div>
					</div>
				</>
			) : (
				<AuthPlaceholder slug={slug} />
			)}
		</div>
	);
};
export default VideoPlayer;

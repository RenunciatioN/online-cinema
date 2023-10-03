import { FC } from 'react';
import cn from 'classnames';

import { IUploadField } from '../form.interface';
import { useUpload } from './useUpload';

import SkeletonLoader from '@components/UI/SkeletonLoader';
import Image from 'next/image';

import styles from '../form.module.scss';

const UploadField: FC<IUploadField> = ({
	error,
	value,
	placeholder,
	folder,
	isNoImage = false,
	style,
	onChange,
}) => {
	const { isLoading, uploadFile } = useUpload(onChange, folder);

	return (
		<div className={cn(styles.field, styles.uploadField)} style={style}>
			<div className={styles.uploadFlex}>
				<label>
					<span>{placeholder}</span>
					<input type="file" onChange={uploadFile} />
					{error && <div className={styles.error}>{error.message}</div>}
				</label>

				{!isNoImage && (
					<div className={styles.uploadImageContainer}>
						{isLoading ? (
							<SkeletonLoader count={1} className="w-full h-full" />
						) : (
							value && <Image src={value} alt="" width={96} height={150}  unoptimized priority />
						)}
					</div>
				)}
			</div>
		</div>
	);
};
export default UploadField;

import { FC } from 'react';
import cn from 'classnames';

import { AdminService } from '@services/admin.service';
import { useQuery } from '@tanstack/react-query';

import styles from '../Admin.module.scss';
import SkeletonLoader from '@components/UI/SkeletonLoader';

const CountUsers: FC = () => {
	const { isLoading, data: response } = useQuery(['count users'], () =>
		AdminService.getCountUsers()
	);

	return (
		<div className={cn(styles.block, styles.countUsers)}>
			<div>
				{isLoading ? (
					<SkeletonLoader />
				) : (
					<div className={styles.number}>
						{response?.data}

						<div className={styles.description}>Пользователи</div>
					</div>
				)}
			</div>
		</div>
	);
};
export default CountUsers;

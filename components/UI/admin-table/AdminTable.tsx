import { FC } from 'react';

import styles from './AdminTable.module.scss';
import { ITableItem } from './admin-table.interface';
import AdminTableHeader from './AdminTableHeader';
import SkeletonLoader from '../SkeletonLoader';
import AdminTableItem from './AdminTableItem';

interface IAdminTable {
	tableItems: ITableItem[];
	isLoading: boolean;
	headerItems: string[];
	removeHandler: (id: string) => void;
}

const AdminTable: FC<IAdminTable> = ({
	tableItems,
	isLoading,
	headerItems,
	removeHandler,
}) => {
	return (
		<div>
			<AdminTableHeader headerItems={headerItems}  />

			{isLoading ? (
				<SkeletonLoader count={1} height={48} className="mt-4" />
			) : tableItems.length ? (
				tableItems.map((tableItem) => (
					<AdminTableItem
						key={tableItem._id}
						removeHandler={() => removeHandler(tableItem._id)}
						tableItem={tableItem}
					/>
				))
			) : (
				<div className={styles.notFound}>Элементы не найдены</div>
			)}
		</div>
	);
};
export default AdminTable;

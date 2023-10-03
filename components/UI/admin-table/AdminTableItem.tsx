import { FC } from 'react';
import { IAdminTableItem } from './admin-table.interface';

import styles from './AdminTable.module.scss';
import AdminAction from './AdminActions/AdminAction';

const AdminTableItem: FC<IAdminTableItem> = ({ removeHandler, tableItem }) => {
	

	return (
		<div className={styles.item}>
			{tableItem.items.map((value) => (
				<div key={value}>{value}</div>
			))}

			<AdminAction
				removeHandler={removeHandler}
				{...tableItem}
			/>

			
		</div>
	);
};
export default AdminTableItem;

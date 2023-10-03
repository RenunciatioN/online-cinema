'use client';

import { FC } from 'react';
import { Tooltip } from 'react-tooltip';

import styles from './AdminAction.module.scss';
import { useRouter } from 'next/navigation';
import MaterialIcon from '@components/UI/MaterialIcon';
import { ITableItem } from '@components/UI/admin-table/admin-table.interface';

interface IAdminActions extends ITableItem {
	removeHandler: () => void;
}

const AdminAction: FC<IAdminActions> = ({
	editUrl,
	removeHandler,
	isMainAdmin,
}) => {
	const { push } = useRouter();

	return (
		<div className={styles.actions}>
			{isMainAdmin ? null : (<>
				<button onClick={() => push(editUrl)} id="editBtn">
					<MaterialIcon name="MdEdit" />
					<Tooltip
						anchorSelect="#editBtn"
						content="Редактрование"
						className="text-xs"
					/>
				</button>
				<button onClick={removeHandler} id="removeBtn">
					<MaterialIcon name="MdClose" />
					<Tooltip
						anchorSelect="#removeBtn"
						content="Удаление"
						className="text-xs"
					/>
				</button>
			</>)}
		</div>
	);
};
export default AdminAction;

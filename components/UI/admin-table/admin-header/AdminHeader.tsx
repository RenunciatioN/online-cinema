import { ChangeEvent, FC } from 'react';

import styles from './AdminHeader.module.scss';
import SearchField from '@UI/search-filed/SearchField';
import AdminCreateButton from './AdminCreateButton';


interface iAdminHeader {
	onClick?: () => void;
	searchTerm: string;
	handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
}

const AdminHeader: FC<iAdminHeader> = ({
	onClick,
	handleSearch,
	searchTerm,
}) => {
	return (
		<div className={styles.header}>
			<SearchField searchTerm={searchTerm} handleSearch={handleSearch} />
			{onClick && <AdminCreateButton onClick={onClick} />}
		</div>
	);
};
export default AdminHeader;

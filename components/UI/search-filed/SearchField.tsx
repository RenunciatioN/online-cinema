import { ChangeEvent, FC } from 'react';

import styles from './SeachField.module.scss';
import MaterialIcon from '../MaterialIcon';

interface ISearchField {
	searchTerm: string;
	handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchField: FC<ISearchField> = ({ searchTerm, handleSearch }) => {
	return (
		<div className={styles.search}>
			<MaterialIcon name="MdSearch" />
			<input
				type="text"
				placeholder="Search"
				value={searchTerm}
				onChange={handleSearch}
			/>
		</div>
	);
};
export default SearchField;

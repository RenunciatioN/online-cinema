'use client';

import { FC } from 'react';
import cn from 'classnames';

import SearchList from './SearchList/SearchList';
import SearchField from '@components/UI/search-filed/SearchField';
import { useSearch } from './useSearch';

import styles from './Search.module.scss';
import stylesSidebar from '../Sidebar.module.scss';

const Search: FC<{ isHovered: boolean }> = ({  isHovered }) => {
	const { isSuccess, data, handleSearch, searchTerm } = useSearch();

	return (
		<div className={cn(styles.wrapper, isHovered ? stylesSidebar.visible : stylesSidebar.hidden)}>
			<SearchField searchTerm={searchTerm} handleSearch={handleSearch} />
			{isSuccess && <SearchList movies={data || []} />}
		</div>
	);
};
export default Search;

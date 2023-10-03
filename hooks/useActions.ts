import { useMemo } from 'react';

import { bindActionCreators } from '@reduxjs/toolkit';
import { useAppDispatch } from '@store/hooks';
import { allActions } from '@store/rootActions';

export const useActions = () => {
	const dispatch = useAppDispatch();

	return useMemo(() => bindActionCreators(allActions, dispatch), [dispatch]);
};

export const getStoreLocal = (name: string) => {
	if (typeof localStorage !== 'undefined') {
		const ls = localStorage.getItem(name);

		if (ls !== 'undefined') {
			return ls ? JSON.parse(ls) : null;
		}
	
		
	}

	return null;
};

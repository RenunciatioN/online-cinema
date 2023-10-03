import { FC } from 'react';

import TanstackProvider from './TanstackProvider';
import { ToastContainer } from 'react-toastify';


type Prop = {
	children: React.ReactNode;
};

const MainProvider: FC<Prop> = ({ children }) => {
	return (
	
			<TanstackProvider>
				{children}
				<ToastContainer autoClose={2000} />
			</TanstackProvider>
		
	);
};
export default MainProvider;

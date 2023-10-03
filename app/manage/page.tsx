
import { NextPage } from 'next';
import { getServerSession } from 'next-auth/next';

import Admin from '@components/sreens/Admin/home/Admin';
import { authConfig } from '@/config/next-auth.config';

const AdminPage: NextPage = () => {
	

	return <Admin />;
};

export default AdminPage;

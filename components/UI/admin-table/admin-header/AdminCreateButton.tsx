import { FC } from 'react';

import Button from '@components/UI/form-elements/Button';

interface Iprop {
	onClick: () => void;
}

const AdminCreateButton: FC<Iprop> = ({ onClick }) => {
	return <Button onClick={onClick}>Создать</Button>;
};
export default AdminCreateButton;

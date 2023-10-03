import { errorCatch } from '@/app/api/api.helpers';
import { toast } from 'react-toastify';

export const toastError = (error: any, title?: string) => {
	const message = errorCatch(error);
	toast.error(title || message, {
		style: {
			background: '#1F2125',
		},
	});

	throw message;
};

export const toastSuccess = (message: string) => {
	toast.success(message, {
		style: { background: '#1F2125' },
	});
};

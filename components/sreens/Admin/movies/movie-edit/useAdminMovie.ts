import { useQuery } from '@tanstack/react-query';
import { ActorService } from '@services/actor.service';
import { toastError } from '@utils/toast';
import { IOption } from '@components/UI/select/select.interface';

export const useAdminActor = () => {
	const queryData = useQuery(['List of actor'], () => ActorService.getAll(), {
		select: ({ data }) =>
			data.map(
				(actor): IOption => ({
					label: actor.name,
					value: actor._id,
				})
			),
		onError: (err) => {
			toastError(`Список актеров - ${err}`);
		},
	});

	return queryData;
};

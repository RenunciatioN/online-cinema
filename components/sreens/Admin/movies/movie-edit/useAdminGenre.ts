import { useQuery } from '@tanstack/react-query';
import { GenreService } from '@services/genre.service';
import { toastError } from '@utils/toast';
import { IOption } from '@components/UI/select/select.interface';

export const useAdminGenre = () => {
	const queryData = useQuery(['List of genre'], () => GenreService.getAll(), {
		select: ({ data }) =>
			data.map(
				(genre): IOption => ({
					label: genre.name,
					value: genre._id,
				})
			),
		onError: (err) => {
			toastError(`Список жанров - ${err}`);
		},
	});

	return queryData;
};

export const convertMongoDate = (data: string) =>
	new Date(data).toLocaleDateString('ru');

export const getGenreListEach = (
	index: number,
	lenght: number,
	name: string
) => (index + 1 === lenght ? name : name + ', ');

interface IArrayItem {
	name: string;
}
export const getGenreList = (array: IArrayItem[]) =>
	array.map((i) => i.name).join(', ');

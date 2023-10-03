import { TypeMaterialIconName } from './icon.types';

export interface IGenre {
	_id: string;
	name: string;
	slug: string;
	description: string;
	icon: TypeMaterialIconName;
}
export interface IParametrs {
	year: number;
	duration: number;
	country: string;
}

export interface IActor {
	_id: string;
	photo: string;
	name: string;
	countMovies: number;
	slug: string;
}

export interface IMovie {
	_id: string;
	title: string;
	poster: string;
	description: string;
	slug: string;
	bigPoster: string;
	parametrs: IParametrs;
	rating: number;
	countOpened?: number;
	videoUrl: string;
	genres: IGenre[];
	actors: IActor[];
}

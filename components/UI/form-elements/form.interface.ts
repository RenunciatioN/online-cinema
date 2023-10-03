import {
	ButtonHTMLAttributes,
	CSSProperties,
	InputHTMLAttributes,
	TextareaHTMLAttributes,
} from 'react';
import { FieldError } from 'react-hook-form';

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {}

export interface IFieldProps {
	placeHolder: string;
	error?: FieldError | undefined;
}

export interface ITextAreaProps {
	placeHolder: string;
	error?: FieldError
}

type TypeInputPropsField = InputHTMLAttributes<HTMLInputElement> & IFieldProps;

type TypeTextAreaPropsField = TextareaHTMLAttributes<HTMLTextAreaElement> &
	ITextAreaProps;

export interface IField extends TypeInputPropsField {}
export interface IFieldArea extends TypeTextAreaPropsField {}

export interface IUploadField {
	folder?: string;
	value?: string;
	onChange: (...event: any[]) => void;
	placeholder: string;
	error?: FieldError;
	style?: CSSProperties;
	isNoImage?: boolean;
}

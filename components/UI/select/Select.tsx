import { FC } from 'react';
import makeAnimated from 'react-select/animated';
import ReactSelect from 'react-select';

import { IOption, ISelect } from './select.interface';
import { OnChangeValue } from 'react-select';

import styles from './Select.module.scss';
import  formStyles  from '../form-elements/form.module.scss';

const amimatedCompinent = makeAnimated();

const Select: FC<ISelect> = ({
	placeHolder,
	error,
	isMulti,
	options,
	field,
	isLoading,
}) => {
	const onChange = (newValue:  OnChangeValue<IOption, boolean>) => {
		field.onChange(
			isMulti
				? (newValue as IOption[]).map((item: IOption) => item.value)
				: (newValue as IOption).value
		);
	};

	const getValue = () => {
		if (field.value) {
			return isMulti
				? options.filter((option) => field.value.indexOf(option.value) >= 0)
				: options.find((option) => option.value === field.value);
		} else {
			return isMulti ? [] : ('' as any);
		}
	};

	return (
		<div className={styles.selectContainer}>
			<label>
				<span>{placeHolder}</span>

				<ReactSelect
					classNamePrefix="custom-select"
					options={options}
					value={getValue()}
					isMulti={isMulti}
					onChange={onChange}
					components={amimatedCompinent}
                    isLoading={isLoading}
                    placeholder={''}
				/>
			</label>

            {error && <div className={formStyles.error}>{error.message}</div>}
		</div>
	);
};
export default Select;

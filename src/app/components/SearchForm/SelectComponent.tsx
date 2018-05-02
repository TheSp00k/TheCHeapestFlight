import * as React from 'react';
import { css } from 'react-emotion';

import { inputComponentStyles, inputStyles, selectStyles } from 'app/components/SearchForm/searchForm.styles';

interface ISelectComponentProps {
    inputName: string;
    inputLabel: string;
    placeholder: string;
    options: Array<{value: string; label: string;}>
    inputValue: any;
    onInputChange: () => void;
}

export const SelectComponent = (props: ISelectComponentProps) => {
    return (
        <div className={css(inputComponentStyles)}>
            <label>
                <div>
                    {props.inputLabel}
                </div>
                <select onChange={props.onInputChange} value={props.inputValue} className={css(inputStyles, selectStyles)} placeholder={props.placeholder} name={props.inputName}>
                    {
                        props.options.map((option, index) => <option key={index} value={option.value}>{option.label}</option>)
                    }
                </select>
            </label>
        </div>
    );
}

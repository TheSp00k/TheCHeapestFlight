import * as React from 'react';
import { css } from 'react-emotion';

import { inputComponentStyles, inputStyles, inputComponentRequiredStyles } from 'app/components/SearchForm/searchForm.styles';

interface ITextInputComponentProps {
    inputName: string;
    inputLabel: string;
    placeholder: string;
    required?: boolean;
    maxLength?: number;
    inputValue: any;
    onInputChange: () => void;
}

export const TextInputComponent = (props: ITextInputComponentProps) => {
    return (
        <div className={css(inputComponentStyles)}>
            <label>
                <div>
                    {props.inputLabel}
                    {props.required &&
                        <span className={css(inputComponentRequiredStyles)}>*</span>
                    }
                </div>
                <input required={props.required} maxLength={props.maxLength} onChange={props.onInputChange} className={css(inputStyles)} name={props.inputName} value={props.inputValue} placeholder={props.placeholder} type='text' />
            </label>
        </div>
    );
}

import * as React from 'react';
import * as moment from 'moment';
import { css } from 'react-emotion';
import { inputComponentStyles, inputStyles, inputComponentRequiredStyles } from 'app/components/SearchForm/searchForm.styles';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


interface IDateInputComponentProps {
    inputName: string;
    inputLabel: string;
    placeholder: string;
    required?: boolean;
    inputValue: any;
    onInputChange: (date: moment.Moment) => void;
}

export const DateInputComponent = (props: IDateInputComponentProps) => {
    return (
        <div className={css(inputComponentStyles)}>
            <label>
                <div>
                    {props.inputLabel}
                    {props.required &&
                        <span className={css(inputComponentRequiredStyles)}>*</span>
                    }
                </div>
                <DatePicker
                    selected={(props.inputValue && moment(props.inputValue)) || null}
                    onChange={props.onInputChange}
                    dateFormat={'YYYY-MM-DD'}
                    placeholderText={props.placeholder}
                    className={css(inputStyles)}
                    required={props.required}
                    minDate={moment()}
                    showDisabledMonthNavigation
                />
            </label>
        </div>
    );
}

import * as React from 'react';
import * as moment from 'moment';
import { css } from 'react-emotion';
import { TextInputComponent } from 'app/components/SearchForm/TextInputComponent';
import { formComponentStyles, inputGroupStyles, groupHeaderStyles, inputWrapperStyles, buttonStyles, primaryButtonStyles } from 'app/components/SearchForm/searchForm.styles';
import { DateInputComponent } from 'app/components/SearchForm/DateInputComponent';
import { SelectComponent } from 'app/components/SearchForm/SelectComponent';

export interface ISearchFormParams {
    departureAirportIataCode: string;
    arrivalAirportIataCode: string;
    outboundDepartureDateFrom: string;
    outboundDepartureDateTo: string;
    inboundDepartureDateFrom: string;
    inboundDepartureDateTo: string;
    priceValueTo: string;
    currency: string;
}
const EMPTY_STATE = {
    departureAirportIataCode: '',
    arrivalAirportIataCode: '',
    outboundDepartureDateFrom: '',
    outboundDepartureDateTo: '',
    inboundDepartureDateFrom: '',
    inboundDepartureDateTo: '',
    priceValueTo: '',
    currency: ''
}
const MOCK_STATE = {
    departureAirportIataCode: 'EIN',
    arrivalAirportIataCode: 'SOF',
    outboundDepartureDateFrom: '2018-06-01',
    outboundDepartureDateTo: '2018-07-01',
    inboundDepartureDateFrom: '2018-06-01',
    inboundDepartureDateTo: '2018-07-01',
    priceValueTo: '300',
    currency: 'EUR'
}
const CURRENCY_OPTIONS = [
    {value: '', label: 'Choose currency'},
    {value: 'EUR', label: '€ EUR'},
    {value: 'USD', label: '$ USD'},
    {value: 'GBP', label: '£ GBP'}
];
export class SearchFormComponent extends React.Component<any, ISearchFormParams> {
    constructor(props: any) {
        super(props);
        this.state = EMPTY_STATE;
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleFormClear = this.handleFormClear.bind(this);
        this.fillMocksForDev = this.fillMocksForDev.bind(this);
    }

    handleFormSubmit(event: any): void {
        this.props.handleFormSubmit(this.state, event);
        event.preventDefault();
    }

    handleInputChange(event: any, uppercase?: boolean) {

        let inputValue = event.target.value;
        const inputName = event.target.name;
        if (uppercase) {
            inputValue = event.target.value.toUpperCase();
        }

        this.setState({ [inputName]: inputValue });

    }
    handleDateChange(date: moment.Moment, inputName: any) {
        this.setState({ [inputName]: moment(date).format('YYYY-MM-DD') });
    }

    handleFormClear() {
        this.setState(EMPTY_STATE);
    }

    fillMocksForDev() {
        this.setState(MOCK_STATE);
    }
    render() {
        return (
            <div className={css(formComponentStyles)}>
                <form onSubmit={this.handleFormSubmit}>
                    <div className={css(inputGroupStyles)}>
                        <div className={css(groupHeaderStyles)}>
                            {'Cities:'}
                        </div>
                        <div className={css(inputWrapperStyles)}>
                            <TextInputComponent
                                inputLabel={'From airport:'}
                                placeholder={'Origin airport code (format: XXX)'}
                                onInputChange={this.handleInputChange.bind(this)}
                                inputName={'departureAirportIataCode'}
                                inputValue={this.state.departureAirportIataCode}
                                required={true}
                                maxLength={3}
                                uppercase={true}
                            />
                            <TextInputComponent
                                inputLabel={'To airport:'}
                                placeholder={'Destination airport code (format: XXX)'}
                                onInputChange={this.handleInputChange.bind(this)}
                                inputName={'arrivalAirportIataCode'}
                                inputValue={this.state.arrivalAirportIataCode}
                                required={true}
                                maxLength={3}
                                uppercase={true}
                            />
                        </div>
                    </div>
                    <div className={css(inputGroupStyles)}>
                        <div className={css(groupHeaderStyles)}>
                            {'Outbound flight:'}
                        </div>
                        <div className={css(inputWrapperStyles)}>
                            <DateInputComponent
                                inputLabel={'From date:'}
                                placeholder={'Choose date'}
                                inputName={'outboundDepartureDateFrom'}
                                onInputChange={(date) => this.handleDateChange(date, 'outboundDepartureDateFrom')}
                                inputValue={this.state.outboundDepartureDateFrom}
                                required={true}
                            />
                            <DateInputComponent
                                inputLabel={'To date:'}
                                placeholder={'Choose date'}
                                inputName={'outboundDepartureDateTo'}
                                onInputChange={(date) => this.handleDateChange(date, 'outboundDepartureDateTo')}
                                inputValue={this.state.outboundDepartureDateTo}
                                required={true}
                            />
                        </div>
                    </div>
                    <div className={css(inputGroupStyles)}>
                        <div className={css(groupHeaderStyles)}>
                            {'Return flight:'}
                        </div>
                        <div className={css(inputWrapperStyles)}>
                            <DateInputComponent
                                inputLabel={'From date:'}
                                placeholder={'Choose date'}
                                inputName={'inboundDepartureDateFrom'}
                                onInputChange={(date) => this.handleDateChange(date, 'inboundDepartureDateFrom')}
                                inputValue={this.state.inboundDepartureDateFrom}
                                required={true}
                            />
                            <DateInputComponent
                                inputLabel={'To date:'}
                                placeholder={'Choose date'}
                                inputName={'inboundDepartureDateTo'}
                                onInputChange={(date) => this.handleDateChange(date, 'inboundDepartureDateTo')}
                                inputValue={this.state.inboundDepartureDateTo}
                                required={true}
                            />
                        </div>
                    </div>
                    <div className={css(inputGroupStyles)}>
                        <div className={css(groupHeaderStyles)}>
                            {'Price:'}
                        </div>
                        <div className={css(inputWrapperStyles)}>
                            <TextInputComponent
                                inputLabel={'Maximum price:'}
                                placeholder={'Tickets price limit'}
                                inputName={'priceValueTo'}
                                onInputChange={this.handleInputChange.bind(this)}
                                inputValue={this.state.priceValueTo}
                            />
                            <SelectComponent
                                inputLabel={'Currency:'}
                                placeholder={'Choose currency'}
                                inputName={'currency'}
                                onInputChange={this.handleInputChange.bind(this)}
                                inputValue={this.state.currency}
                                options={CURRENCY_OPTIONS}
                            />
                        </div>
                    </div>
                    <div>
                        <input className={css(primaryButtonStyles, buttonStyles)} type={'submit'} value={'Find the cheapest flight!'} />
                        <button className={css(buttonStyles)} onClick={this.handleFormClear} type={'button'}>Clear the flight</button>
                        <button className={css(buttonStyles)} onClick={this.fillMocksForDev} type={'button'}>fill mocks for development reasons</button>
                    </div>
                </form>
            </div>
        );
    }
}

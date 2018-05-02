import * as React from 'react';
import * as moment from 'moment';
import { css } from 'react-emotion';
import {
    resultComponentStyles,
    resultTitleStyles,
    resultGroupContinerStyles,
    resultGroupTitleStyles,
    resultGroupItemStyles,
    resultGroupItemsWrapperStyles,
    resultGroupItemLabelStyles,
    resultGroupItemValueStyles,
    resultTotalPriceStyles,
    inputErrorMessageStyle
} from 'app/components/SearchResult/searchResult.styles';
import { IAppComponentState, IInputError, IResultFare } from 'app/containers/App';

  
interface ISearchResultComponentProps {
    inputErrors: Array<IInputError> | null;
    resultFare?: IResultFare | null;
    noFlightsFoundMessage?: string | null;
}

export class SearchResultComponent extends React.Component<ISearchResultComponentProps, IAppComponentState> {
    render() {
        if (this.props.inputErrors && this.props.inputErrors.length > 0) {
            return (
                <div className={css(resultComponentStyles)}>
                    <div className={css(resultTitleStyles)}>
                        Some input errors has occured:
                    </div>
                    {
                        this.props.inputErrors.map((error, index) => {
                            return (
                                <div key={index} className={css(inputErrorMessageStyle)}>
                                    {error.message}
                                </div>
                            )
                        })
                    }
                </div>
            )
        }

        if (this.props.noFlightsFoundMessage) {
            return (
                <div className={css(resultComponentStyles)}>
                    <div className={css(resultTitleStyles)}>
                        {this.props.noFlightsFoundMessage}
                    </div>
                </div>
            );
        }

        if (!this.props.resultFare) {
            return null;
        }

        const inbound = this.props.resultFare.inbound;
        const outbound = this.props.resultFare.outbound;
        const summary = this.props.resultFare.summary;
        return (
            <div className={css(resultComponentStyles)}>
                <div className={css(resultTitleStyles)}>
                    {`${inbound.departureAirport.name} - ${inbound.arrivalAirport.name}`}
                </div>
                <div className={css(resultGroupContinerStyles)}>
                    <div className={css(resultGroupTitleStyles)}>
                        {`${outbound.departureAirport.iataCode} - ${outbound.arrivalAirport.iataCode}`}
                    </div>
                    <div className={css(resultGroupItemsWrapperStyles)}>
                        <div className={css(resultGroupItemStyles)}>
                            <div className={css(resultGroupItemLabelStyles)}>Take off:</div>
                            <div className={css(resultGroupItemValueStyles)}>{moment(outbound.departureDate).format('YYYY-MM-DD HH:mm:ss')}</div>
                        </div>
                        <div className={css(resultGroupItemStyles)}>
                            <div className={css(resultGroupItemLabelStyles)}>Landing:</div>
                            <div className={css(resultGroupItemValueStyles)}>{moment(outbound.arrivalDate).format('YYYY-MM-DD HH:mm:ss')}</div>
                        </div>
                        <div className={css(resultGroupItemStyles)}>
                            <div className={css(resultGroupItemLabelStyles)}>Price:</div>
                            <div className={css(resultGroupItemValueStyles)}>{`${outbound.price.currencySymbol} ${Number.parseFloat(outbound.price.value.toString()).toFixed(2)}`}</div>
                        </div>
                    </div>
                </div>
                <div className={css(resultGroupContinerStyles)}>
                    <div className={css(resultGroupTitleStyles)}>
                        {`${inbound.departureAirport.iataCode} - ${inbound.arrivalAirport.iataCode}`}
                    </div>
                    <div className={css(resultGroupItemsWrapperStyles)}>
                        <div className={css(resultGroupItemStyles)}>
                            <div className={css(resultGroupItemLabelStyles)}>Take off:</div>
                            <div className={css(resultGroupItemValueStyles)}>{moment(inbound.departureDate).format('YYYY-MM-DD HH:mm:ss')}</div>
                        </div>
                        <div className={css(resultGroupItemStyles)}>
                            <div className={css(resultGroupItemLabelStyles)}>Landing:</div>
                            <div className={css(resultGroupItemValueStyles)}>{moment(inbound.arrivalDate).format('YYYY-MM-DD HH:mm:ss')}</div>
                        </div>
                        <div className={css(resultGroupItemStyles)}>
                            <div className={css(resultGroupItemLabelStyles)}>Price:</div>
                            <div className={css(resultGroupItemValueStyles)}>{`${inbound.price.currencySymbol} ${Number.parseFloat(inbound.price.value.toString()).toFixed(2)}`}</div>
                        </div>
                    </div>
                </div>
                <div className={css(resultGroupContinerStyles)}>
                    <div className={css(resultGroupTitleStyles)}>
                        Total price:
                    </div>
                    <div className={css(resultTotalPriceStyles)}>
                        {`${summary.price.currencySymbol} ${Number.parseFloat(summary.price.value.toString()).toFixed(2)}`}
                    </div>
                </div>
            </div>
        );
    }
    
}

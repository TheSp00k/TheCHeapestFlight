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
    resultTotalPriceStyles
} from 'app/components/SearchResult/searchResult.styles';
import { IAppComponentState } from 'app/containers/App';

export class SearchResultComponent extends React.Component<any, IAppComponentState> {
    render() {
        
        if (!this.props.resultFare) {
            return null
        }
        if (this.props.resultFare.message) {
            return (
                <div className={css(resultTitleStyles)}>
                    {this.props.resultFare.message}
                </div>
            );
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
                            <div className={css(resultGroupItemValueStyles)}>{`${outbound.price.currencySymbol} ${outbound.price.value}`}</div>
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
                            <div className={css(resultGroupItemValueStyles)}>{`${inbound.price.currencySymbol} ${inbound.price.value}`}</div>
                        </div>
                    </div>
                </div>
                <div className={css(resultGroupContinerStyles)}>
                    <div className={css(resultGroupTitleStyles)}>
                        Total price:
                    </div>
                    <div className={css(resultTotalPriceStyles)}>
                        {`${summary.price.currencySymbol} ${summary.price.value}`}
                    </div>
                </div>
            </div>
        );
    }
    
}

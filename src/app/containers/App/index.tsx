import * as React from 'react';
import axios from 'axios';
import { css } from 'react-emotion';

import { HeaderComponent } from 'app/components/Header/HeaderComponent';
import { SearchFormComponent, ISearchFormParams } from 'app/components/SearchForm/SearchFormComponent';
import { SearchResultComponent } from 'app/components/SearchResult/SearchResultComponent';
import { appContainerStyle, wrapperStyle } from 'app/containers/App/app.styles';

const API_URL = 'https://api.ryanair.com/farefinder/3/roundTripFares';

interface IAirport {
  countryName: string;
  iataCode: string;
  name: string;
  seoName: string;
}

interface IFare {
  arrivalAirport: IAirport,
  arrivalDate: string;
  departureAirport: IAirport,
  departureDate: string;
}

export interface IAppComponentState {
  resultFare?: {
    inbound?: IFare;
    outbound?: IFare;
    summary?: {
      newRoute: boolean;
      price: {
        currencyCode: string;
        currencySymbol: string;
        value: number;
        valueFractionalUnit: string;
        valueMainUnit: string;
      }
    }
  }
}

export class App extends React.Component<any, IAppComponentState> {
  constructor(props: any) {
    super(props);
    this.state = {};
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  handleFormSubmit(params: ISearchFormParams, event: Event): void {
    event.preventDefault();
    axios.get(`${API_URL}`, {
      params: params
    }).then((response) => {
      let resultFare = response.data.fares[0];
      if (!resultFare) {
        resultFare = {
          message: 'Sorry, no flights match your criteria :('
        }
      }
      this.setState({resultFare: resultFare});
    }).catch((error) => {
      console.log(error);
    });
  }
  render() {
    return (
      <div className={css(appContainerStyle)}>
        <HeaderComponent />
        <div className={css(wrapperStyle)}>
          <SearchFormComponent handleFormSubmit={this.handleFormSubmit} />
          <SearchResultComponent resultFare={this.state.resultFare} />
        </div>
      </div>
    );
  }
}

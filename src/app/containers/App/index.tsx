import * as React from 'react';
import axios from 'axios';
import { css } from 'react-emotion';

import { HeaderComponent } from 'app/components/Header/HeaderComponent';
import { SearchFormComponent, ISearchFormParams } from 'app/components/SearchForm/SearchFormComponent';
import { SearchResultComponent } from 'app/components/SearchResult/SearchResultComponent';
import { appContainerStyle, wrapperStyle } from 'app/containers/App/app.styles';

const SEARCH_API_URL = 'https://api.ryanair.com/farefinder/3/roundTripFares';
const AIRPORT_VALIDATION_API_URL = 'https://api.ryanair.com/aggregate/3/common?embedded=airports';

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
  price: IPrice;
}

interface IPrice {
  currencyCode: string;
  currencySymbol: string;
  value: number;
  valueFractionalUnit: string;
  valueMainUnit: string;
}

export interface IInputError {
  message: string;
  inputName: string
}

export interface IResultFare {
  inbound: IFare;
  outbound: IFare;
  summary: {
    newRoute: boolean;
    price: IPrice;
  };
}

export interface IAppComponentState {
  resultFare: IResultFare | null;
  noFlightsFoundMessage: string | null;
  errors: Array<IInputError> | null;
}

export class App extends React.Component<any, IAppComponentState> {
  constructor(props: any) {
    super(props);
    this.state = {
      resultFare: null,
      errors: null,
      noFlightsFoundMessage: null
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  airportExists(airports: any, iataCode: any) {
    return airports.some((airport: any) => {
      return airport.iataCode === iataCode;
    });
  }

  

  handleFormSubmit(params: ISearchFormParams, event: Event): void {
    event.preventDefault();
    
    this.setState({resultFare: null});
    this.setState({errors: []});
    this.setState({noFlightsFoundMessage: null});
    axios.get(`${AIRPORT_VALIDATION_API_URL}`)
      .then((response): any => {
        const airports = response.data.airports;
        const departureAirportIataCode = params.departureAirportIataCode;
        const arrivalAirportIataCode = params.arrivalAirportIataCode;
        const hasDepartureAirport = this.airportExists(airports, departureAirportIataCode);
        const hasArivalAirport = this.airportExists(airports, arrivalAirportIataCode);
        const errors = [];
        if (!hasDepartureAirport) {
          errors.push({ message: `There is no departure airport with code: "${departureAirportIataCode}" in RyanAir sistem.`, inputName: 'departureAirportIataCode' });
        }
        if (!hasArivalAirport) {
          errors.push({ message: `There is no arival airport with code: "${arrivalAirportIataCode}" in RyanAir sistem.`, inputName: 'arrivalAirportIataCode' });
        }        
        if (errors.length > 0) {
          return {errors};
        }
        return axios.get(`${SEARCH_API_URL}`, { params: params });
    }).then((response) => {
        
        if (response.errors) {
          this.setState({errors: response.errors});
        } else {
          const resultFare = response.data.fares[0];
          if (resultFare) {
            this.setState({resultFare: resultFare});
          } else {
            this.setState({noFlightsFoundMessage: 'Sorry, no flights match your criteria :('});
        }
      }      
    }).catch((error) => {
      console.log(error);
    });
  }
  render() {
    return (
      <div className={css(appContainerStyle)}>
        <HeaderComponent />
        <div className={css(wrapperStyle)}>
          <SearchFormComponent inputErrors={this.state.errors} handleFormSubmit={this.handleFormSubmit} />
          <SearchResultComponent inputErrors={this.state.errors} resultFare={this.state.resultFare} noFlightsFoundMessage={this.state.noFlightsFoundMessage} />
        </div>
      </div>
    );
  }
}

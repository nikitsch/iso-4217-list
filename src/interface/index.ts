export interface ICountry {
  _id: string;
  country: string;
  currency: string;
  alphabeticCode: string;
  numericCode: number;
  minorUnit: string;
}

export interface IPageList {
  _id: string;
  alphabeticCodes: string[];
  countries: string[];
}

export interface IInactiveCountries {
  _id: 'inactiveCountries';
  countries: string[];
}

export interface IInactiveCurrencies {
  _id: 'inactiveCurrencies';
  currencies: number[];
}

export enum TableEnum {
  COUNTRIES = 'COUNTRIES',
  CURRENCY = 'CURRENCY',
}

export enum ActionEnum {
  ADD = 'ADD',
  REMOVE = 'REMOVE',
}

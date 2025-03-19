export interface ICountry {
  _id: string;
  country: string;
  currency: string;
  alphabeticCode: string;
  numericCode: number;
  minorUnit: string;
}
export type ISOCountries = ICountry[];

export interface IPageList {
  _id: string;
  alphabeticCodes: string[];
  countries: string[];
}

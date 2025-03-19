export interface Country {
  _id: string;
  country: string;
  currency: string;
  alphabeticCode: string;
  numericCode: number;
  minorUnit: string;
}
export type ISOCountries = Country[];

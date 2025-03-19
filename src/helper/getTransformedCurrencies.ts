import { IPageList, ISOCountries } from '~interface/index';

export const getTransformedCurrencies = (array: ISOCountries) => {
  const result = array.reduce((acc: { [key: string]: IPageList }, cur) => {
    const { _id, alphabeticCode, country, numericCode } = cur;

    if (numericCode in acc) {
      acc[numericCode].countries.push(country);
      return acc;
    }

    return {
      ...acc,
      [numericCode]: {
        _id,
        countries: [country],
        alphabeticCodes: [alphabeticCode],
      },
    };
  }, {});

  return Object.entries(result);
};

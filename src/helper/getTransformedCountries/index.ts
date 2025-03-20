import { ICountry, IPageList } from '~interface/index';

export const getTransformedCountries = (array: ICountry[]) => {
  const result = array.reduce((acc: { [key: string]: IPageList }, cur) => {
    const { _id, alphabeticCode, country } = cur;

    if (country in acc) {
      acc[country].alphabeticCodes.push(alphabeticCode);
      return acc;
    }

    return {
      ...acc,
      [country]: {
        _id,
        countries: [country],
        alphabeticCodes: [alphabeticCode],
      },
    };
  }, {});

  return Object.entries(result);
};

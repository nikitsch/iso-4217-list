import { IPageList } from '~interface/index';

export const currencyCompareFn = (
  a: [numericCode: string, item: IPageList],
  b: [numericCode: string, item: IPageList]
) => {
  const nameA = a[1].alphabeticCodes[0];
  const nameB = b[1].alphabeticCodes[0];

  if (nameA < nameB) {
    return -1;
  }

  if (nameA > nameB) {
    return 1;
  }

  return 0;
};

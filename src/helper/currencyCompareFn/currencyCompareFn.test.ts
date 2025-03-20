import { currencyCompareFn } from './index';

describe('currencyCompareFn', () => {
  it('Должен вернуть -1, если первая валюта идет раньше второй в алфавитном порядке', () => {
    const itemA = {
      _id: '673a0820c0c94b4f862b6490',
      countries: ['BANGLADESH'],
      alphabeticCodes: ['BDT'],
    };
    const itemB = {
      _id: '673a0820c0c94b4f862b64a1',
      countries: ['BULGARIA'],
      alphabeticCodes: ['BGN'],
    };

    const result = currencyCompareFn(['50', itemA], ['975', itemB]);

    expect(result).toBe(-1);
  });

  it('Должен вернуть 1, если первая валюта идет позже второй в алфавитном порядке', () => {
    const itemA = {
      _id: '673a0820c0c94b4f862b64b1',
      countries: ['CONGO (THE DEMOCRATIC REPUBLIC OF THE)'],
      alphabeticCodes: ['CDF'],
    };
    const itemB = {
      _id: '673a0820c0c94b4f862b64a7',
      countries: ['CANADA'],
      alphabeticCodes: ['CAD'],
    };

    const result = currencyCompareFn(['976', itemA], ['124', itemB]);

    expect(result).toBe(1);
  });

  it('Должен вернуть 0, если валюты одинаковые', () => {
    const itemA = {
      _id: '673a0820c0c94b4f862b64b9',
      countries: ['CURAÇAO', 'SINT MAARTEN (DUTCH PART)'],
      alphabeticCodes: ['ANG'],
    };
    const itemB = {
      _id: '673a0820c0c94b4f862b64b9',
      countries: ['CURAÇAO', 'SINT MAARTEN (DUTCH PART)'],
      alphabeticCodes: ['ANG'],
    };

    const result = currencyCompareFn(['532', itemA], ['532', itemB]);

    expect(result).toBe(0);
  });
});

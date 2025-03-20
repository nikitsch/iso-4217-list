import { getTransformedCurrencies } from '.';

describe('getTransformedCurrencies', () => {
  it('Должен корректно трансформировать массив стран ДЛЯ СПИСКА ВАЛЮТ в порядке возрастания numericCode', () => {
    const input = [
      {
        _id: 'f2j2jj2j2j2',
        country: 'AFGHANISTAN',
        currency: 'Afghani',
        alphabeticCode: 'AFN',
        numericCode: 971,
        minorUnit: '2',
      },
      {
        _id: 'firstID',
        country: 'ÅLAND ISLANDS',
        currency: 'Euro',
        alphabeticCode: 'EUR',
        numericCode: 978,
        minorUnit: '2',
      },
      {
        _id: 'jn3jj33j3j',
        country: 'BHUTAN',
        currency: 'Indian Rupee',
        alphabeticCode: 'INR',
        numericCode: 356,
        minorUnit: '2',
      },
      {
        _id: 'secontID',
        country: 'BELGIUM',
        currency: 'Euro',
        alphabeticCode: 'EUR',
        numericCode: 978,
        minorUnit: '2',
      },
    ];

    const expectedOutput = [
      [
        '356',
        {
          _id: 'jn3jj33j3j',
          countries: ['BHUTAN'],
          alphabeticCodes: ['INR'],
        },
      ],
      [
        '971',
        {
          _id: 'f2j2jj2j2j2',
          countries: ['AFGHANISTAN'],
          alphabeticCodes: ['AFN'],
        },
      ],
      [
        '978',
        {
          _id: 'firstID',
          countries: ['ÅLAND ISLANDS', 'BELGIUM'],
          alphabeticCodes: ['EUR'],
        },
      ],
    ];

    expect(getTransformedCurrencies(input)).toEqual(expectedOutput);
  });

  it('Должен вернуть пустой массив, если передан пустой массив', () => {
    expect(getTransformedCurrencies([])).toEqual([]);
  });
});

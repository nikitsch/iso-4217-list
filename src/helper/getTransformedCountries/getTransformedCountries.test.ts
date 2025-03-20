import { getTransformedCountries } from './index';

describe('getTransformedCountries', () => {
  it('Должен корректно трансформировать массив стран ДЛЯ СПИСКА СТРАН', () => {
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
        _id: 'mj3mj3mj3m3mj3nm',
        country: 'ÅLAND ISLANDS',
        currency: 'Euro',
        alphabeticCode: 'EUR',
        numericCode: 978,
        minorUnit: '2',
      },
      {
        _id: 'firstID',
        country: 'BHUTAN',
        currency: 'Indian Rupee',
        alphabeticCode: 'INR',
        numericCode: 356,
        minorUnit: '2',
      },
      {
        _id: 'secondID',
        country: 'BHUTAN',
        currency: 'Ngultrum',
        alphabeticCode: 'BTN',
        numericCode: 64,
        minorUnit: '2',
      },
    ];

    const expectedOutput = [
      [
        'AFGHANISTAN',
        {
          _id: 'f2j2jj2j2j2',
          countries: ['AFGHANISTAN'],
          alphabeticCodes: ['AFN'],
        },
      ],
      [
        'ÅLAND ISLANDS',
        {
          _id: 'mj3mj3mj3m3mj3nm',
          countries: ['ÅLAND ISLANDS'],
          alphabeticCodes: ['EUR'],
        },
      ],
      [
        'BHUTAN',
        {
          _id: 'firstID',
          countries: ['BHUTAN'],
          alphabeticCodes: ['INR', 'BTN'],
        },
      ],
    ];

    expect(getTransformedCountries(input)).toEqual(expectedOutput);
  });

  it('Должен вернуть пустой массив, если передан пустой массив', () => {
    expect(getTransformedCountries([])).toEqual([]);
  });
});

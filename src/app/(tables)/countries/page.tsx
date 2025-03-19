'use client';

import { useState } from 'react';
import { useGetISOCountries } from '~hook/useGetISOCountries';
import { ISOCountries, PageList } from '~interface/index';

import '../styles.css';

const getCountries = (iso: ISOCountries) => {
  return iso.reduce((acc: { [key: string]: PageList }, cur) => {
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
};

const getInputCheckboxValue = (inactive: string[], value: string) =>
  inactive.includes(value);

export default function Countries() {
  const { isoCountries, loading } = useGetISOCountries();
  const [inactiveCurrencies, setInactiveCurrencies] = useState<string[]>([]);

  const handleChange = (value: string) => {
    setInactiveCurrencies((prev) =>
      prev.includes(value)
        ? prev.filter((el) => el !== value)
        : [...prev, value]
    );
  };

  if (loading) return '...Loading';

  return (
    <div>
      <h1 className="table-title">Countries</h1>
      {isoCountries?.length ? (
        <div className="list">
          {Object.entries(getCountries(isoCountries)).map(([country, item]) => {
            const { _id, alphabeticCodes } = item;
            const codes = alphabeticCodes.join(', ');
            const checked = getInputCheckboxValue(inactiveCurrencies, country);

            return (
              <div
                key={_id}
                className="grid grid-cols-10 grid-flow-col gap-4 p-2"
              >
                <div className="flex align-middle col-span-1">
                  <input
                    id="countries"
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleChange(country)}
                  />
                </div>
                <div className={`col-span-7 ${checked ? 'inactive' : ''}`}>
                  {country}
                </div>
                <div
                  className={`flex justify-end col-span-2 ${checked ? 'inactive' : ''}`}
                >
                  {codes}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No data :(</p>
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import { getInputCheckboxValue } from '~helper/getInputCheckboxValue';
import { useGetISOCountries } from '~hook/useGetISOCountries';
import { ISOCountries, IPageList } from '~interface/index';
import Loader from '../(components)/Loader';
import NoData from '../(components)/NoData';
import GridRow from '../(components)/GridRow';

import '../styles.css';

import type { FC } from 'react';

const getCountries = (iso: ISOCountries) => {
  return iso.reduce((acc: { [key: string]: IPageList }, cur) => {
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

const Countries: FC = () => {
  const { isoCountries, loading } = useGetISOCountries();
  const [inactiveCurrencies, setInactiveCurrencies] = useState<string[]>([]);

  const handleChange = (value: string) => {
    setInactiveCurrencies((prev) =>
      prev.includes(value)
        ? prev.filter((el) => el !== value)
        : [...prev, value]
    );
  };

  if (loading) return <Loader />;
  if (!isoCountries?.length) return <NoData />;

  return (
    <div className="list">
      {Object.entries(getCountries(isoCountries)).map(([country, item]) => {
        const { _id, alphabeticCodes } = item;
        const codes = alphabeticCodes.join(', ');
        const checked = getInputCheckboxValue(inactiveCurrencies, country);

        return (
          <GridRow
            key={_id}
            page="countries"
            checked={checked}
            content={[country, codes]}
            classNames={['flex align-middle', 'col-span-7', 'col-span-2']}
            onChange={() => handleChange(country)}
          />
        );
      })}
    </div>
  );
};

export default Countries;

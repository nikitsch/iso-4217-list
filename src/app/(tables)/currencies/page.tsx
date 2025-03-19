'use client';

import { useState } from 'react';
import { getTransformedCurrencies } from '~helper/getTransformedCurrencies';
import { getInputCheckboxValue } from '~helper/getInputCheckboxValue';
import { currencyCompareFn } from '~helper/currencyCompareFn';
import { useGetISOCountries } from '~hook/useGetISOCountries';
import Loader from '../(components)/Loader';
import NoData from '../(components)/NoData';
import GridRow from '../(components)/GridRow';

import '../styles.css';

import type { FC } from 'react';

const Currencies: FC = () => {
  const { isoCountries, loading } = useGetISOCountries();
  const [inactiveCurrencies, setInactiveCurrencies] = useState<number[]>([]);

  const handleChange = (value: number) => {
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
      {getTransformedCurrencies(isoCountries)
        .sort(currencyCompareFn)
        .map(([numericCode, item]) => {
          const { _id, alphabeticCodes, countries } = item;
          const code = +numericCode;
          const alphabeticCode = alphabeticCodes[0];
          const checked = getInputCheckboxValue(inactiveCurrencies, code);

          return (
            <GridRow
              key={_id}
              page="countries"
              checked={checked}
              content={[alphabeticCode, countries.join(', ')]}
              classNames={['', 'align-middle col-span-2', 'col-span-7']}
              onChange={() => handleChange(code)}
            />
          );
        })}
    </div>
  );
};

export default Currencies;

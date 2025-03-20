'use client';

import { getTransformedCurrencies } from '~helper/getTransformedCurrencies';
import { getInputCheckboxValue } from '~helper/getInputCheckboxValue';
import { currencyCompareFn } from '~helper/currencyCompareFn';
import { useGetCountries } from '~hook/useGetCountries';
import Loader from '../(components)/Loader';
import NoData from '../(components)/NoData';
import GridRow from '../(components)/GridRow';

import '../styles.css';

import type { FC } from 'react';
import { useGetInactiveCurrencies } from '~hook/useGetInactiveCurrencies';

const Currencies: FC = () => {
  const {
    data: { isoCountries = [] } = {},
    isLoading: isLoadingCountries,
    isFetching: isFetchingCountries,
  } = useGetCountries();
  const {
    data: { inactiveCurrencies: inactive = [] } = {},
    isLoading: isLoadingInactive,
    isFetching: isFetchingInactive,
  } = useGetInactiveCurrencies();

  if (isLoadingCountries || isFetchingCountries) return <Loader />;
  if (!isoCountries?.length) return <NoData />;

  const handleChange = (value: number) => alert(value);

  return (
    <div className="list">
      {getTransformedCurrencies(isoCountries)
        .sort(currencyCompareFn)
        .map(([numericCode, item]) => {
          const { _id, alphabeticCodes, countries } = item;
          const code = +numericCode;
          const alphabeticCode = alphabeticCodes[0];
          const checked = getInputCheckboxValue(inactive, code);

          return (
            <GridRow
              key={_id}
              page="countries"
              content={[alphabeticCode, countries.join(', ')]}
              checked={checked}
              onChange={() => handleChange(code)}
              disabled={isLoadingInactive || isFetchingInactive}
              classNames={['', 'align-middle col-span-2', 'col-span-7']}
            />
          );
        })}
    </div>
  );
};

export default Currencies;

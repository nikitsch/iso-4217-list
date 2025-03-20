'use client';

import { getTransformedCountries } from '~helper/getTransformedCountries';
import { getInputCheckboxValue } from '~helper/getInputCheckboxValue';
import { useGetCountries } from '~hook/useGetCountries';
import { useGetInactiveCountries } from '~hook/useGetInactiveCountries';
import Loader from '../(components)/Loader';
import NoData from '../(components)/NoData';
import GridRow from '../(components)/GridRow';

import '../styles.css';

import type { FC } from 'react';

const Countries: FC = () => {
  const {
    data: { isoCountries = [] } = {},
    isLoading: isLoadingCountries,
    isFetching: isFetchingCountries,
  } = useGetCountries();
  const {
    data: { inactiveCountries: inactive = [] } = {},
    isLoading: isLoadingInactive,
    isFetching: isFetchingInactive,
  } = useGetInactiveCountries();

  if (isLoadingCountries || isFetchingCountries) return <Loader />;
  if (!isoCountries?.length) return <NoData />;

  const handleChange = (value: string) => alert(value);

  return (
    <div className="list">
      {getTransformedCountries(isoCountries).map(([country, item]) => {
        const { _id, alphabeticCodes } = item;
        const codes = alphabeticCodes.join(', ');
        const checked = getInputCheckboxValue(inactive, country);

        return (
          <GridRow
            key={_id}
            page="countries"
            content={[country, codes]}
            checked={checked}
            onChange={() => handleChange(country)}
            disabled={isLoadingInactive || isFetchingInactive}
            classNames={['flex align-middle', 'col-span-7', 'col-span-2']}
          />
        );
      })}
    </div>
  );
};

export default Countries;

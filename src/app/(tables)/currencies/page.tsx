'use client';

import { getTransformedCurrencies } from '~helper/getTransformedCurrencies';
import { getInputCheckboxValue } from '~helper/getInputCheckboxValue';
import { currencyCompareFn } from '~helper/currencyCompareFn';
import { useGetCountries } from '~hook/useGetCountries';
import { useGetInactiveCurrencies } from '~hook/useGetInactiveCurrencies';
import { useUpdateInactive } from '~hook/useUpdateInactive';
import { ActionEnum, TableEnum } from '~interface/index';
import Loader from '../(components)/Loader';
import NoData from '../(components)/NoData';
import GridRow from '../(components)/GridRow';

import '../styles.css';

import type { FC } from 'react';

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

  const { mutate: updateInactive, isPending: isPendingUpdateInactive } =
    useUpdateInactive(TableEnum.CURRENCY);

  if (isLoadingCountries || isFetchingCountries) return <Loader />;
  if (!isoCountries?.length) return <NoData />;

  const handleChange = (
    { checked }: EventTarget & HTMLInputElement,
    value: number
  ) => {
    const action = checked ? ActionEnum.ADD : ActionEnum.REMOVE;
    updateInactive({ action, value });
  };

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
              id={_id}
              content={[alphabeticCode, countries.join(', ')]}
              checked={checked}
              onChange={(e) => handleChange(e.target, code)}
              disabled={
                isLoadingInactive ||
                isFetchingInactive ||
                isPendingUpdateInactive
              }
              classNames={['', 'align-middle col-span-2', 'col-span-7']}
            />
          );
        })}
    </div>
  );
};

export default Currencies;

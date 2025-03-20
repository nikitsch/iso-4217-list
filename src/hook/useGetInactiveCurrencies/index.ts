'use client';

import { useQuery } from '@tanstack/react-query';
import { ERROR_MESSAGES } from '~constant/index';
import { TableEnum } from '~interface/index';

const getInactiveCurrencies = async () => {
  try {
    const response = await fetch(
      `/api/get_inactive?table=${TableEnum.CURRENCY}`
    );
    const data = await response.json();

    if (!response.ok) {
      console.error(ERROR_MESSAGES.FAILED_FETCH_INACTIVE, data.error);

      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    console.error(ERROR_MESSAGES.FAILED_FETCH_INACTIVE, error);

    throw error;
  }
};

export function useGetInactiveCurrencies() {
  return useQuery({
    queryKey: ['inactiveCurrencies'],
    queryFn: getInactiveCurrencies,
  });
}

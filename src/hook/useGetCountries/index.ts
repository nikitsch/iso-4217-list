'use client';

import { useQuery } from '@tanstack/react-query';
import { ERROR_MESSAGES } from '~constant/index';

const getCountries = async () => {
  try {
    const response = await fetch('/api/get_countries');
    const data = await response.json();

    if (!response.ok) {
      console.error(ERROR_MESSAGES.FAILED_FETCH_COUNTRIES, data.error);

      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    console.error(ERROR_MESSAGES.FAILED_FETCH_COUNTRIES, error);

    throw error;
  }
};

export function useGetCountries() {
  return useQuery({
    queryKey: ['countries'],
    queryFn: getCountries,
    staleTime: Infinity,
  });
}

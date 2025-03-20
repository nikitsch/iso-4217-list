'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ERROR_MESSAGES } from '~constant/index';
import { ActionEnum, TableEnum } from '~interface/index';

const updateInactive = async ({
  table,
  action,
  value,
}: {
  table: TableEnum;
  action: ActionEnum;
  value: string | number;
}) => {
  try {
    const response = await fetch('/api/update_inactive', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ table, action, value }),
    });
    const data = await response.json();

    if (!response.ok) {
      console.error(ERROR_MESSAGES.FAILED_UPDATE_INACTIVE, data.error);

      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    console.error(ERROR_MESSAGES.FAILED_UPDATE_INACTIVE, error);

    throw error;
  }
};

export function useUpdateInactive(table: TableEnum) {
  const queryClient = useQueryClient();
  const queryKey =
    table === TableEnum.COUNTRIES
      ? ['inactiveCountries']
      : ['inactiveCurrencies'];

  return useMutation({
    mutationFn: (params: { action: ActionEnum; value: string | number }) =>
      updateInactive({ ...params, table }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
}

'use client';

import { useGetISOCountries } from '~hook/useGetISOCountries';

export default function Countries() {
  const { isoCountries } = useGetISOCountries();
  console.log({ isoCountries });

  return (
    <div>
      <h1>Currency</h1>
    </div>
  );
}

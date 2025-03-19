'use client';

import { useEffect, useState } from 'react';
import { ISOCountries } from '~interface/index';

export function useGetISOCountries() {
  const [isoCountries, setIsoCountries] = useState<ISOCountries>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaticData = async () => {
      try {
        const res = await fetch('/api/get_iso_countries');

        if (res.ok) {
          const { isoCountries } = await res.json();
          setIsoCountries(isoCountries);
        }
      } catch (error) {
        console.error('Failed to fetch ISO countries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStaticData();
  }, []);

  return { isoCountries, loading };
}

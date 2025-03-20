'use client';

import {
  QueryClient,
  QueryClientProvider as TanstackQueryClientProvider,
} from '@tanstack/react-query';

import { useState, type PropsWithChildren } from 'react';

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       retry: 1,
//       refetchOnWindowFocus: false,
//     },
//   },
// });

export default function QueryClientProvider({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <TanstackQueryClientProvider client={queryClient}>
      {children}
    </TanstackQueryClientProvider>
  );
}

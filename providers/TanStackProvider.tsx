import { QueryClient, QueryClientProvider as TanstackQueryProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

interface TanStackProviderProps {
  children: ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

export function TanStackProvider({ children }: TanStackProviderProps) {
  return <TanstackQueryProvider client={queryClient}>{children}</TanstackQueryProvider>;
}

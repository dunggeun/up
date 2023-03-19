import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export const withReactQuery = (component: React.ReactElement): JSX.Element => (
  <QueryClientProvider client={queryClient}>
    {component}
  </QueryClientProvider>
);

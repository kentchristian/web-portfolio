import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();


// 1: QueryClient Provider for useQuery and mutations from tanstack query

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}


// add other providers here if use others
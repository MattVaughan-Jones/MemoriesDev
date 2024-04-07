'use client';

import { ApolloWrapper } from 'lib/graphql-provider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ApolloWrapper>{children}</ApolloWrapper>;
}

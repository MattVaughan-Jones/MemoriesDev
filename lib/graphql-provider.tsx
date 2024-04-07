'use client';

import { ApolloClient, HttpLink, SuspenseCache, from } from '@apollo/client';
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  SSRMultipartLink
} from '@apollo/experimental-nextjs-app-support/ssr';

function makeClient() {
  const httpLink = new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_SITE_URL}/api/graphql`
  });

  return new ApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: typeof window === 'undefined' ? from([new SSRMultipartLink({ stripDefer: true }), httpLink]) : httpLink,
    connectToDevTools: true
  });
}

function makeSuspenseCache() {
  return new SuspenseCache();
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient} makeSuspenseCache={makeSuspenseCache}>
      {children}
    </ApolloNextAppProvider>
  );
}

import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Body from '@/components/layout/body'
import { SessionProvider } from 'next-auth/react'
import { ProductsProvider } from '@/context/ProductsContext'
import {
  QueryClient,
  QueryClientProvider,
  isServer,
} from '@tanstack/react-query'

let browserQueryClient: QueryClient | undefined

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
      },
    },
  })
}

export function getQueryClient() {
  if (isServer) {
    return makeQueryClient()
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <ProductsProvider>
          <Body>
            <Component {...pageProps} />
          </Body>
        </ProductsProvider>
      </SessionProvider>
    </QueryClientProvider>
  )
}

import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Body from '@/components/layout/body'
import { SessionProvider } from 'next-auth/react'
import { ProductsProvider } from '@/context/ProductsContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

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

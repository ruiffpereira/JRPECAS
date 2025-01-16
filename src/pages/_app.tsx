import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Body from '@/components/layout/body'
import { CartProvider } from '../context/CartContext'
import { SessionProvider } from 'next-auth/react'
import { ProductsProvider } from '@/context/ProductsContext'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ProductsProvider>
        <CartProvider>
          <Body>
            <Component {...pageProps} />
          </Body>
        </CartProvider>
      </ProductsProvider>
    </SessionProvider>
  )
}

import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Body from '@/components/layout/body'
import { CartProvider } from '../context/CartContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Body>
        <Component {...pageProps} />
      </Body>
    </CartProvider>
  )
}

import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Body from '@/components/layout/body'
import { SessionProvider } from 'next-auth/react'
import { ProductsProvider } from '@/context/ProductsContext'

export default function App({
  Component,
  pageProps: { ...pageProps },
}: AppProps) {
  return (
    <div>
      <Component {...pageProps} />
    </div>
  )
  // return (
  //   <SessionProvider session={session}>
  //     <ProductsProvider>
  //       <Body>
  //         <Component {...pageProps} />
  //       </Body>
  //     </ProductsProvider>
  //   </SessionProvider>
  // )
}

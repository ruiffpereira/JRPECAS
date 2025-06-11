import Image from 'next/image'
import { ReactNode } from 'react'
import Header from './header'
import Footer from './footer'
import { useProducts } from '@/context/ProductsContext'

interface BodyProps {
  children: ReactNode
}

const Body: React.FC<BodyProps> = ({ children }) => {
  const { searchProduct } = useProducts()

  return (
    <div
      className={`main-content flex h-dvh flex-col overflow-auto bg-gray-900`}
    >
      <Header />
      <section
        className={`relative mb-4 h-96 flex-shrink-0 ${searchProduct.length > 0 && 'hidden md:block'}`}
      >
        <Image
          src="/3.jpg"
          alt="Banner"
          fill
          priority
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
          }}
          className="h-full w-full"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-black/80 via-black/60 to-black/60">
          <h2 className="mb-2 px-4 text-center text-4xl font-extrabold tracking-tight text-white drop-shadow-lg md:text-5xl">
            Complete Peças Usadas
          </h2>
          <span className="mb-4 block text-center text-lg font-medium tracking-wide text-red-400 md:text-xl">
            Peças de Carros à Venda
          </span>
          <div className="mt-2 h-1 w-32 rounded-full bg-gradient-to-r from-red-500 via-yellow-400 to-red-500 opacity-80"></div>
        </div>
      </section>
      <main className="container mx-auto mb-4 flex flex-grow flex-col gap-4 p-4">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Body

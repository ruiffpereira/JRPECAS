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
    <div className={`flex h-dvh flex-col overflow-auto bg-gray-900`}>
      <Header />
      <section
        className={`relative mb-4 h-96 flex-shrink-0 ${searchProduct.length > 0 && 'hidden md:block'}`}
      >
        <Image
          src="/3.jpg"
          alt="Banner"
          fill
          priority
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          className="h-full w-full"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <h2 className="px-4 text-center text-4xl font-bold text-white">
            Peças de Carros à Venda
          </h2>
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

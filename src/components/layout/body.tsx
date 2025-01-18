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
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Header />
      <section
        className={`relative h-96 mb-4 ${searchProduct.length > 0 && 'hidden mb:block'}`}
      >
        <Image
          src="/3.jpg"
          alt="Banner"
          fill
          priority
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          className="w-full h-full"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <h2 className="text-white text-4xl font-bold">
            Peças de Carros à Venda
          </h2>
        </div>
      </section>
      <main className="container mx-auto p-4 flex flex-col gap-4">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Body

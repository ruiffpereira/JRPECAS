import Link from 'next/link'
import { useProducts } from '@/context/ProductsContext'
import Image from 'next/image'
import { Fragment } from 'react'

const URL_RAIZ = process.env.NEXT_PUBLIC_CONTAINERRAIZ

const Cart: React.FC = () => {
  const { cart } = useProducts()
  return (
    <Fragment>
      <h1 className="text-3xl font-bold text-white mb-8">
        Carrinho de Compras
      </h1>
      {cart.length === 0 ? (
        <p className="text-white">Seu carrinho está vazio.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 text-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-700">Imagem</th>
                <th className="py-2 px-4 border-b border-gray-700">Nome</th>
                <th className="py-2 px-4 border-b border-gray-700">
                  Descrição
                </th>
                <th className="py-2 px-4 border-b border-gray-700">Preço</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => {
                const modifiedPhotoUrl = item.photos[0].slice(2)
                return (
                  <tr key={index} className="hover:bg-gray-700">
                    <td className="py-2 px-4 border-b border-gray-700">
                      <div className="relative w-24 h-24">
                        <Image
                          src={`${URL_RAIZ}/${modifiedPhotoUrl}`}
                          alt={item.name}
                          width={200}
                          height={200}
                          style={{
                            objectFit: 'contain',
                            width: '100%',
                            height: '100%',
                          }}
                          className="rounded-md"
                        />
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b border-gray-700">
                      {item.name}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-700">
                      {item.description}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-700">
                      {item.price}€
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
      <div className="mt-8">
        <Link href="/" className="text-red-500 hover:underline">
          Continuar Comprando
        </Link>
      </div>
    </Fragment>
  )
}

export default Cart

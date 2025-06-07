import Link from 'next/link'
import { useProducts } from '@/context/ProductsContext'
import Image from 'next/image'
import { Fragment } from 'react'
import { CiSquarePlus, CiSquareMinus } from 'react-icons/ci'
import router from 'next/router'

const Cart: React.FC = () => {
  const { cart, addToCart } = useProducts()

  return (
    <Fragment>
      <h1 className="mb-8 text-3xl font-bold text-white">
        Carrinho de Compras
      </h1>
      {cart.products.length === 0 ? (
        <p className="text-white">Seu carrinho está vazio.</p>
      ) : (
        <Fragment>
          <div className="mb-4 text-end text-lg">
            Total:
            <span className="ml-2 text-2xl font-bold">{cart.shipPrice}€</span>
          </div>
          <div className="overflow-auto">
            <table className="min-w-full rounded-md bg-gray-800 text-white">
              <thead className="z-10 bg-gray-800">
                <tr>
                  <th className="border-b border-gray-700 px-2 py-2 text-start">
                    Imagem
                  </th>
                  <th className="border-b border-gray-700 px-2 py-2 text-start">
                    Nome
                  </th>
                  <th className="border-b border-gray-700 px-2 py-2 text-start">
                    Quantidade
                  </th>
                  <th className="border-b border-gray-700 px-2 py-4 text-start">
                    Preço
                  </th>
                </tr>
              </thead>
              <tbody>
                {cart.products.map((item, index) => {
                  return (
                    <tr key={index} className="hover:bg-gray-700">
                      <td className="border-b border-gray-700 px-4 py-2">
                        <div className="relative h-24 w-24">
                          <Image
                            src={`${process.env.NEXT_PUBLIC_CONTAINERRAIZ}/${
                              item.photos?.[0].slice(2) ?? ''
                            }`}
                            alt={item.name || ''}
                            width={200}
                            height={200}
                            className="h-full w-full rounded-md"
                          />
                        </div>
                      </td>
                      <td className="border-b border-gray-700 px-4 py-2">
                        {item.name}
                      </td>
                      <td className="border-b border-gray-700 px-4 py-2">
                        <div className="flex items-center gap-1">
                          <button
                            className="text-4xl"
                            onClick={() =>
                              addToCart({
                                productId: item.productId ?? '',
                                quantity: 0,
                              })
                            }
                          >
                            <CiSquareMinus />
                          </button>
                          <div className="w-7 text-center">{item.quantity}</div>
                          <button
                            className="text-4xl"
                            onClick={() =>
                              addToCart({
                                productId: item.productId ?? '',
                                quantity: 1,
                              })
                            }
                          >
                            <CiSquarePlus />
                          </button>
                        </div>
                      </td>
                      <td className="border-b border-gray-700 px-4 py-2">
                        {item.price}€
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <button
            onClick={() => router.push('/cart/checkout')}
            className="text-end text-xl text-red-500"
          >
            Finalizar Encomenda
          </button>
        </Fragment>
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

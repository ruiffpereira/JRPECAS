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
      <h1 className="text-3xl font-bold text-white mb-8">
        Carrinho de Compras
      </h1>
      {cart.products.length === 0 ? (
        <p className="text-white">Seu carrinho está vazio.</p>
      ) : (
        <Fragment>
          <div className="text-end mb-4  text-lg">
            Total:
            <span className="ml-2 font-bold text-2xl">{cart.shipPrice}€</span>
          </div>
          <div className="overflow-auto">
            <table className="min-w-full bg-gray-800 text-white rounded-md">
              <thead className="bg-gray-800 z-10 ">
                <tr>
                  <th className="py-2 px-2 border-b text-start border-gray-700">
                    Imagem
                  </th>
                  <th className="py-2 px-2 border-b text-start border-gray-700">
                    Nome
                  </th>
                  <th className="py-2 px-2 border-b text-start border-gray-700">
                    Quantidade
                  </th>
                  <th className="py-4 px-2 border-b text-start border-gray-700">
                    Preço
                  </th>
                </tr>
              </thead>
              <tbody>
                {cart.products.map((item, index) => {
                  return (
                    <tr key={index} className="hover:bg-gray-700">
                      <td className="py-2 px-4 border-b border-gray-700">
                        <div className="relative w-24 h-24">
                          <Image
                            src={`${process.env.NEXT_PUBLIC_CONTAINERRAIZ}/${item.photos?.[0].slice(2) ?? ''}`}
                            alt={item.name || ''}
                            width={200}
                            height={200}
                            className="rounded-md w-full h-full"
                          />
                        </div>
                      </td>
                      <td className="py-2 px-4 border-b border-gray-700">
                        {item.name}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-700">
                        <div className="flex gap-1 items-center">
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
                      <td className="py-2 px-4 border-b border-gray-700">
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
            className="text-end text-red-500 text-xl"
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

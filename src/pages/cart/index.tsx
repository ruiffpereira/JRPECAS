import Link from 'next/link'
import { useProducts } from '@/context/ProductsContext'
import Image from 'next/image'
import { Fragment } from 'react'
import { CiSquarePlus, CiSquareMinus } from 'react-icons/ci'
import router from 'next/router'
import routes from '@/routes'

const Cart: React.FC = () => {
  const { cart, addToCart } = useProducts()

  return (
    <>
      {cart.products.length === 0 ? (
        <div className="rounded-xl bg-gray-800/80 p-8 text-center text-gray-300 shadow">
          <p className="mb-4 text-lg">O seu carrinho está vazio.</p>
          <Link
            href="/"
            className="inline-block rounded bg-red-500 px-6 py-2 font-semibold text-white shadow transition hover:bg-red-600"
          >
            Ver Produtos
          </Link>
        </div>
      ) : (
        <Fragment>
          <div className="mb-6 flex items-end justify-end gap-2">
            <span className="text-lg text-gray-300">Total:</span>
            <span className="rounded bg-gray-800 px-4 py-2 text-2xl font-bold text-green-400 shadow">
              {cart.shipPrice}€
            </span>
          </div>
          <div className="overflow-x-auto rounded-xl shadow">
            <table className="min-w-full bg-gray-800/90 text-white">
              <thead>
                <tr>
                  <th className="px-2 py-3 text-left text-sm font-semibold text-gray-400">
                    Imagem
                  </th>
                  <th className="px-2 py-3 text-left text-sm font-semibold text-gray-400">
                    Nome
                  </th>
                  <th className="px-2 py-3 text-center text-sm font-semibold text-gray-400">
                    Quantidade
                  </th>
                  <th className="px-2 py-3 text-left text-sm font-semibold text-gray-400">
                    Preço
                  </th>
                </tr>
              </thead>
              <tbody>
                {cart.products.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-700 transition hover:bg-gray-700/60"
                  >
                    <td className="px-4 py-3">
                      <div className="relative h-16 w-16 overflow-hidden rounded-md border border-gray-700 bg-gray-900">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_CONTAINERRAIZ}/${item.photos?.[0].slice(2) ?? ''}`}
                          alt={item.name || ''}
                          width={64}
                          height={64}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3 align-middle">{item.name}</td>
                    <td className="px-4 py-3 align-middle">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          className="rounded p-1 text-2xl text-red-400 transition hover:bg-red-500 hover:text-white"
                          onClick={() =>
                            addToCart({
                              productId: item.productId ?? '',
                              quantity: 0,
                            })
                          }
                          aria-label="Remover"
                        >
                          <CiSquareMinus />
                        </button>
                        <span className="w-8 text-center text-lg font-semibold text-gray-100">
                          {item.quantity}
                        </span>
                        <button
                          className="rounded p-1 text-2xl text-green-400 transition hover:bg-green-500 hover:text-white"
                          onClick={() =>
                            addToCart({
                              productId: item.productId ?? '',
                              quantity: 1,
                            })
                          }
                          aria-label="Adicionar"
                        >
                          <CiSquarePlus />
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3 align-middle font-semibold text-gray-100">
                      {item.price}€
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 flex flex-row flex-wrap items-center justify-between gap-4">
            <Link
              href="/"
              className="rounded bg-gray-700 px-4 py-2 font-semibold text-gray-200 shadow transition hover:bg-gray-600"
            >
              Continuar Comprando
            </Link>
            <button
              onClick={() => router.push(routes.checkout)}
              className="rounded bg-red-500 px-4 py-2 text-lg font-bold text-white shadow transition hover:bg-red-600"
            >
              Finalizar Encomenda
            </button>
          </div>
        </Fragment>
      )}
    </>
  )
}

export default Cart

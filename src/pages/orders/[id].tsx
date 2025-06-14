import { useGetWebsitesEcommerceOrdersId } from '@/servers/ecommerce/hooks/useGetWebsitesEcommerceOrdersId'
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import { Session } from 'next-auth'
import routes from '@/routes'
import Link from 'next/link'

export default function OrderIdPage({
  sessionNext,
  id,
}: {
  sessionNext: Session
  id: string
}) {
  const {
    data: orderDetails,
    isLoading,
    error,
  } = useGetWebsitesEcommerceOrdersId(id, {
    client: {
      headers: {
        Authorization: `Bearer ${sessionNext.user.token}`,
      },
    },
  })

  if (!sessionNext) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="mb-6 text-3xl font-bold">Detalhes da Encomenda</h1>
        <Link href={routes.login}>
          Faça login para ver os detalhes da encomenda.
        </Link>
      </div>
    )
  }
  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="mb-6 text-3xl font-bold">Detalhes da Encomenda</h1>
        <p className="text-gray-700">Carregando...</p>
      </div>
    )
  }
  if (error) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="mb-6 text-3xl font-bold">Detalhes da Encomenda</h1>
        <p className="text-red-500">Encomenda nao encontrada.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto mt-8 max-w-2xl rounded-xl border border-slate-600 p-6 shadow-lg">
      <h1 className="mb-6 text-center text-3xl font-bold text-green-400">
        Detalhes da Encomenda <br />
        <span className="block text-sm text-gray-400">
          {orderDetails?.orderId}
        </span>
      </h1>
      {orderDetails && (
        <div key={orderDetails.orderId}>
          <div className="mb-5 flex flex-col md:flex-row md:justify-between">
            <div>
              <h2 className="mb-2 font-semibold text-gray-400">
                Data:{' '}
                <span className="text-lg text-white">
                  {orderDetails.createdAt
                    ? new Date(orderDetails.createdAt).toLocaleString('pt-PT', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : 'Data indisponível'}{' '}
                </span>
                <br />
              </h2>
            </div>
            <div>
              <p className="text-lg text-gray-300">
                <span className="font-semibold text-white">Total:</span>{' '}
                <span className="text-2xl font-bold text-green-400">
                  {orderDetails.price}€
                </span>
              </p>
            </div>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-white">Produtos</h3>
          <ul className="divide-y divide-gray-700 rounded-lg bg-gray-800 shadow">
            {orderDetails.orderProducts?.map((product) => (
              <li
                key={product.productId}
                className="flex flex-col gap-2 px-4 py-4 md:flex-row md:items-center"
              >
                <div className="flex-1">
                  <span className="font-semibold text-white">
                    {product.product?.name}
                  </span>
                  <span className="ml-2 text-gray-400">
                    {product.orderProductId}
                  </span>
                  <div className="mt-1 text-sm text-gray-400">
                    Quantidade:{' '}
                    <span className="text-white">{product.quantity}</span>
                    {' | '}
                    Preço unitário:{' '}
                    <span className="text-white">
                      {product.product?.price}€
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const session = await getSession(context)

  if (!session) {
    return {
      props: {},
    }
  }

  const { id } = context.params as { id: string }

  return {
    props: { sessionNext: session, id },
  }
}

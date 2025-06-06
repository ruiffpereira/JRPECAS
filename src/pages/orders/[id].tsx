import { useGetWebsitesEcommerceOrdersId } from "@/servers/ecommerce/hooks/useGetWebsitesEcommerceOrdersId";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

export default function OrderIdPage({
  sessionNext,
  id,
}: {
  sessionNext: any;
  id: string;
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
  });

  if (!sessionNext) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Detalhes da Encomenda</h1>
        <p className="text-gray-700">
          Faça login para ver os detalhes da encomenda.
        </p>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Detalhes da Encomenda</h1>
        <p className="text-gray-700">Carregando...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Detalhes da Encomenda</h1>
        <p className="text-red-500">Encomenda nao encontrada.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl p-6 border border-slate-600 rounded-xl shadow-lg mt-8">
      <h1 className="text-3xl font-bold text-green-400 mb-6 text-center">
        Detalhes da Encomenda
      </h1>
      {orderDetails && (
        <div key={orderDetails.orderId} className="mb-6">
          <div className="flex flex-col md:flex-row md:justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">
                Encomenda #{orderDetails.orderId}
              </h2>
              <p className="text-gray-400">
                <span className="font-semibold">Data:</span>{" "}
                {orderDetails.createdAt
                  ? new Date(orderDetails.createdAt).toLocaleString("pt-PT", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "Data indisponível"}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-lg text-gray-300">
                <span className="font-semibold text-white">Total:</span>{" "}
                <span className="text-green-400 font-bold text-2xl">
                  {orderDetails.price}€
                </span>
              </p>
            </div>
          </div>
          <h3 className="mt-6 mb-2 text-lg font-semibold text-white">
            Produtos
          </h3>
          <ul className="divide-y divide-gray-700 bg-gray-800 rounded-lg shadow">
            {orderDetails.orderProducts?.map((product) => (
              <li
                key={product.productId}
                className="flex flex-col md:flex-row md:items-center gap-2 py-4 px-4"
              >
                <div className="flex-1">
                  <span className="font-semibold text-white">
                    {product.product?.name}
                  </span>
                  <span className="text-gray-400 ml-2">
                    {product.orderProductId}
                  </span>
                  <div className="text-gray-400 text-sm mt-1">
                    Quantidade:{" "}
                    <span className="text-white">{product.quantity}</span>
                    {" | "}
                    Preço unitário:{" "}
                    <span className="text-white">
                      {product.product?.price}€
                    </span>
                  </div>
                </div>
                <div className="text-green-400 font-bold text-lg">
                  Subtotal:{" "}
                  {product.quantity && product.product?.price
                    ? (product.quantity * product.product.price).toFixed(2)
                    : "—"}
                  €
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);

  if (!session) {
    return {
      props: {},
    };
  }

  const { id } = context.params as { id: string };

  return {
    props: { sessionNext: session, id },
  };
};

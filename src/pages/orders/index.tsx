import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { useGetWebsitesEcommerceOrders } from "@/servers/ecommerce/hooks/useGetWebsitesEcommerceOrders";
import { GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import Link from "next/link";
import routes from "@/routes";

const OrdersPage = ({ sessionNext }: { sessionNext: Session }) => {
  const [details, setDetails] = useState<boolean>(false);

  const {
    data: orders,
    isLoading,
    error,
  } = useGetWebsitesEcommerceOrders({
    client: {
      headers: {
        Authorization: `Bearer ${sessionNext.user.token}`,
      },
    },
  });

  if (!sessionNext) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Minhas Encomendas</h1>
        <Link href={routes.user} className="text-blue-500 hover:underline">
          Faça login para ver suas encomendas
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Minhas Encomendas</h1>
        <p className="text-gray-700">Carregando...</p>
      </div>
    );
  }

  if (error) {
    console.error("Error fetching orders:", error);
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Minhas Encomendas</h1>
        <p className="text-red-500">Erro ao carregar as encomendas.</p>
      </div>
    );
  }

  console.log("Orders data:", orders);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Minhas Encomendas</h1>
      {orders && orders.length === 0 ? (
        <p className="text-gray-700">Não há encomendas para exibir.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders &&
            orders.map((order) => (
              <div
                key={order.orderId}
                className="bg-gray-800 shadow-md rounded-lg p-4 border border-gray-200"
              >
                <h2 className="text-xl font-bold mb-2">
                  Encomenda {order.orderId}
                </h2>
                <p className="text-white mb-2">
                  <strong className="text-gray-400">Data:</strong>{" "}
                  {new Date(order.createdAt ?? "").toLocaleString("pt-PT", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <p className="text-white mb-2">
                  <strong className="text-gray-400">Total:</strong>{" "}
                  {order.price}€
                </p>
                <p className="text-white mb-2">
                  <strong className="text-gray-400">Estado:</strong>{" "}
                  <strong className="text-green-500">Pago</strong>
                </p>
                <div className="mt-4">
                  <Link
                    className=" bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    href={routes.orderDetails(order.orderId)}
                  >
                    Ver Detalhes
                  </Link>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);

  if (!session) {
    return {
      props: {},
    };
  }

  return {
    props: { sessionNext: session },
  };
};

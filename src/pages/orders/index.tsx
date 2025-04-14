import { useEffect, useState } from 'react'

interface Order {
  id: string
  date: string
  total: number
  status: string
}

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    // Simulação de chamada à API para buscar as encomendas
    const fetchOrders = async () => {
      const mockOrders: Order[] = [
        { id: '1', date: '2025-04-10', total: 50.0, status: 'Entregue' },
        {
          id: '2',
          date: '2025-04-09',
          total: 30.0,
          status: 'Em processamento',
        },
        { id: '3', date: '2025-04-08', total: 100.0, status: 'Cancelada' },
      ]
      setOrders(mockOrders)
    }

    fetchOrders()
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Minhas Encomendas</h1>
      {orders.length === 0 ? (
        <p className="text-gray-700">Não há encomendas para exibir.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-gray-800 shadow-md rounded-lg p-4 border border-gray-200"
            >
              <h2 className="text-xl font-bold mb-2">Encomenda #{order.id}</h2>
              <p className="text-white mb-2">
                <strong className="text-gray-400">Data:</strong> {order.date}
              </p>
              <p className="text-white mb-2">
                <strong className="text-gray-400">Total:</strong> {order.total}€
              </p>
              <p
                className={`text-sm font-bold mt-2 ${
                  order.status === 'Entregue'
                    ? 'text-green-500'
                    : order.status === 'Em processamento'
                      ? 'text-yellow-500'
                      : 'text-red-500'
                }`}
              >
                {order.status}
              </p>
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => alert(`Detalhes da encomenda ${order.id}`)}
              >
                Ver Detalhes
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default OrdersPage

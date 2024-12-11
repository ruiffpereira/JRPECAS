import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import Image from 'next/image'

const Cart: React.FC = () => {
  const { cart } = useCart()

  return (
    <div className="bg-gray-900" style={{ backgroundColor: '#131616' }}>
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
              {cart.map((item, index) => (
                <tr key={index} className="hover:bg-gray-700">
                  <td className="py-2 px-4 border-b border-gray-700">
                    <div className="relative w-24 h-24">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        objectFit="contain"
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
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="mt-8">
        <Link href="/" className="text-red-500 hover:underline">
          Continuar Comprando
        </Link>
      </div>
    </div>
  )
}

export default Cart

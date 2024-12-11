import Image from 'next/image'
import { FaShoppingCart } from 'react-icons/fa'
import { useCart } from '../context/CartContext'

interface ProductCardProps {
  name: string
  price: number
  category: string
  description: string
  imageUrl: string
  condition: string
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  category,
  description,
  imageUrl,
  condition,
}) => {
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart({ name, price, category, description, imageUrl, condition })
  }

  return (
    <div className="border border-gray-700 rounded-lg p-4 shadow-md relative bg-gray-800 flex flex-col">
      <div className="relative w-full h-32">
        <Image
          src={imageUrl}
          alt={name}
          fill
          objectFit="contain"
          className="rounded-md"
        />
      </div>
      <h2 className="text-sm text-white">{name}</h2>
      <p className="text-gray-300 text-sm">{description}</p>
      <div className="flex justify-between items-center mt-auto">
        <p className="text-xl text-white">{price}€</p>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={handleAddToCart}
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  )
}

export default ProductCard

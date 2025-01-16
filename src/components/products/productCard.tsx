import Image from 'next/image'
import { useProducts } from '../../context/ProductsContext'
import { Product } from '@/types/types'

const URL_RAIZ = process.env.NEXT_PUBLIC_CONTAINERRAIZ

const ProductCard: React.FC<Product> = ({
  productId,
  name,
  price,
  description,
  photos,
}) => {
  const { addToCart } = useProducts()

  const handleAddToCart = () => {
    addToCart({ productId, name, price, description, photos })
  }
  const modifiedPhotoUrl = photos[0].slice(2)

  return (
    <div className="border border-gray-700 rounded-lg p-4 shadow-md relative bg-gray-800 flex flex-col">
      <div className="relative w-full h-32" id={`${productId}`}>
        {Array.isArray(photos) && photos.length > 0 ? (
          <Image
            src={`${URL_RAIZ}/${modifiedPhotoUrl}`}
            alt={name}
            fill
            objectFit="contain"
            className="rounded-md"
          />
        ) : (
          <span>No photos available</span>
        )}
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

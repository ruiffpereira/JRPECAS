import Image from 'next/image'
import { useProducts } from '../../context/ProductsContext'
import { FiShoppingCart } from 'react-icons/fi'
import { Product } from '@/server/ecommerce'

const URL_RAIZ = process.env.NEXT_PUBLIC_CONTAINERRAIZ

const ProductCard: React.FC<Product> = ({
  productId,
  name,
  description,
  price,
  photos,
}) => {
  const { addToCart } = useProducts()

  return (
    <div className="border border-gray-700 rounded-lg p-4 shadow-md relative bg-gray-800 flex flex-col">
      <div className="relative w-full h-32" id={`${productId}`}>
        {Array.isArray(photos) && photos.length > 0 ? (
          <Image
            src={`${URL_RAIZ}/${photos[0].slice(2)}`}
            alt={name}
            width={200}
            height={200}
            style={{ objectFit: 'contain', width: '100%', height: '100%' }}
            className="rounded-md"
          />
        ) : (
          <span>No photos available</span>
        )}
      </div>
      <h2 className="text-sm text-white">{name}</h2>
      <p className="text-gray-300 text-sm">{description}</p>
      <div className="flex justify-between items-center mt-auto pt-8">
        <p className="text-xl text-white font-bold">{price}€</p>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={() =>
            addToCart({
              productId,
              quantity: 1,
            })
          }
        >
          <FiShoppingCart />
        </button>
      </div>
    </div>
  )
}

export default ProductCard

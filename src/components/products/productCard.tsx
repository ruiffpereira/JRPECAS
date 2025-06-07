import Image from 'next/image'
import { useProducts } from '../../context/ProductsContext'
import { FiShoppingCart } from 'react-icons/fi'
import { Product } from '@/servers/ecommerce'

const ProductCard: React.FC<Product> = ({
  productId,
  name,
  description,
  price,
  photos,
}) => {
  const { addToCart } = useProducts()

  return (
    <div className="relative flex flex-col rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-md">
      <div className="relative h-32 w-full" id={`${productId}`}>
        {Array.isArray(photos) && photos.length > 0 ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_CONTAINERRAIZ}/${
              photos?.[0].slice(2) ?? ''
            }`}
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
      <p className="text-sm text-gray-300">{description}</p>
      <div className="mt-auto flex items-center justify-between pt-8">
        <p className="text-xl font-bold text-white">{price}€</p>
        <button
          className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
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

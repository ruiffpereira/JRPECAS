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
    <div className="group relative flex flex-col rounded-md border border-gray-700 bg-gray-800 p-4 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl">
      <div className="relative mb-3 flex h-24 items-center justify-center rounded-lg">
        {Array.isArray(photos) && photos.length > 0 ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_CONTAINERRAIZ}/${photos?.[0].slice(2) ?? ''}`}
            alt={name}
            width={96}
            height={96}
            style={{ objectFit: 'contain', width: '100%', height: '100%' }}
            className="rounded-lg"
          />
        ) : (
          <span className="text-xs text-gray-400">Sem imagem</span>
        )}
      </div>
      <h2 className="mb-1 truncate text-base font-bold text-white transition group-hover:text-red-400">
        {name}
      </h2>
      <p className="mb-4 line-clamp-2 text-sm text-gray-300">
        {description && description.length > 0
          ? description
          : 'Sem descrição disponível para este produto.'}
      </p>
      <div className="mt-auto flex items-center justify-between pt-2">
        <span className="text-xl font-bold text-red-500 drop-shadow-sm">
          {price}€
        </span>
        <button
          className="flex items-center justify-center rounded bg-gray-700 p-2 text-gray-200 shadow transition hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          onClick={() =>
            addToCart({
              productId,
              quantity: 1,
            })
          }
          aria-label="Adicionar ao carrinho"
        >
          <FiShoppingCart size={18} />
        </button>
      </div>
    </div>
  )
}

export default ProductCard

import { useState, Suspense, Fragment } from 'react'
import ProductCard from '@/components/products/productCard'
import { Product } from '@/types/types'

// Defina a interface para as propriedades
interface ProductGridProps {
  products: Product[]
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [priceRange, setPriceRange] = useState(1000)
  const [filtersActive, setFiltersActive] = useState(false)
  let categories = [] as string[]

  const category = new Set<string>()
  products.forEach((product) => {
    category.add(product.category.name)
  })
  categories = Array.from(category)

  const filteredProducts = products.filter((product) => {
    return (
      (selectedCategory === '' ||
        (product.category && product.category.name === selectedCategory)) &&
      product.price <= priceRange
    )
  })

  console.log(selectedCategory)

  return (
    <Fragment>
      <div className="flex gap-2">
        <h2 className="text-xxl font-bold text-white">Produtos</h2>
        {(selectedCategory !== '' || priceRange < 1000) && (
          <h2 className="text-xxl font-bold text-green-600">Filtros ativos</h2>
        )}
      </div>

      <main className="container mx-auto py-8">
        <div className="flex gap-8">
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 w-full md:w-2/3">
            {products.length > 0 ? (
              filteredProducts.map((product, index) => (
                <Suspense fallback={<div>Loading...</div>} key={index}>
                  <ProductCard
                    productId={product.productId}
                    name={product.name}
                    price={product.price}
                    description={product.description}
                    photos={product.photos}
                    category={product.category}
                    subcategory={product.subcategory}
                  />
                </Suspense>
              ))
            ) : (
              <div>No products available</div>
            )}
          </div>
          <div className="hidden md:block w-1/3 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-white">Filtros</h2>
            <div className="mb-4">
              <label className="block text-gray-400">Categoria</label>
              <select
                className="w-full p-2 border rounded bg-gray-800 text-white"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Todas</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-400">Preço até</label>
              <input
                type="range"
                className="w-full"
                min="0"
                max="1000"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
              />
              <div className="text-gray-400">{priceRange} €</div>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  )
}

export default ProductGrid

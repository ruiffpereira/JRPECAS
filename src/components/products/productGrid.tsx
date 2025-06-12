import { useState, Suspense, Fragment } from 'react'
import ProductCard from '@/components/products/productCard'
import { useProducts } from '@/context/ProductsContext'
import { Product } from '@/servers/ecommerce'

// Defina a interface para as propriedades
interface ProductGridProps {
  products: Product[]
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [priceRange, setPriceRange] = useState(1000)
  let categories = [] as string[]
  const { searchProduct } = useProducts()
  const [filtersOpen, setFilterstOpen] = useState(false)

  const category = new Set<string>()
  products.forEach((product) => {
    category.add(product.category?.name || '')
  })
  categories = Array.from(category)

  const filteredProducts = products.filter((product) => {
    return (
      (selectedCategory === '' ||
        (product.category && product.category.name === selectedCategory)) &&
      product.price <= priceRange &&
      (searchProduct === '' ||
        product.name.toLowerCase().includes(searchProduct.toLowerCase()))
    )
  })

  return (
    <Fragment>
      <div className="flex gap-1">
        <h2
          className={`text-xxl font-bold text-green-600 ${
            filteredProducts.length < products.length ? 'block' : 'hidden'
          } `}
        >
          Resultado da pesquisa: {filteredProducts.length}
        </h2>
        <h2 className="text-xxl font-bold text-white">Produtos</h2>
      </div>
      <button
        onClick={() => {
          setFilterstOpen(true)
        }}
        className={`d-flex h-11 w-full items-center rounded border ${
          filteredProducts.length < products.length
            ? 'text-green-600'
            : 'text-white'
        } hover:bg-gray-800 md:hidden`}
      >
        Filtros {filteredProducts.length < products.length && 'ativos'}
      </button>
      <main className="container mx-auto">
        <div className="flex gap-10">
          <div className="grid w-full grid-cols-2 gap-4 md:w-2/3 xl:grid-cols-3">
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
          <div className="hidden w-1/3 rounded-lg md:block">
            {filteredProducts.length === products.length && (
              <h2 className="mb-4 text-xl font-bold text-white">Filtros</h2>
            )}

            {filteredProducts.length < products.length && (
              <h2 className="mb-4 text-xl font-bold text-green-600">
                Filtros ativos
              </h2>
            )}
            <div className="mb-4">
              <label className="mb-2 block text-gray-400">Categoria</label>
              <select
                className="w-full rounded border bg-gray-800 p-2 text-white"
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
          {/* MOBILE */}
          <div
            className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300 ${
              filtersOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
            } md:hidden`}
          >
            <div
              className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300 ${
                filtersOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
              }`}
              onClick={() => {
                setFilterstOpen(false)
              }}
            ></div>
            <nav
              className={`fixed right-0 top-0 z-50 h-full w-3/4 transform bg-gray-900 p-4 text-white transition-transform duration-300 ${
                filtersOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
              <div className="flex flex-col gap-2">
                <h2 className="mb-4 text-xl font-bold text-white">Filtros</h2>
                <div className="mb-4">
                  <label className="mb-2 block text-gray-400">Categoria</label>
                  <select
                    className="w-full rounded border bg-gray-800 p-2 text-white"
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
            </nav>
          </div>
        </div>
      </main>
    </Fragment>
  )
}

export default ProductGrid

import { useState, Suspense } from 'react'
import ProductCard from '@/components/productCard'

const products = [
  {
    name: 'Peça 1',
    price: 100,
    category: 'Categoria 1',
    description: 'Descrição da peça 1',
    imageUrl: '/1.png',
    condition: 'Novo',
  },
  {
    name: 'Peça 2',
    price: 200,
    category: 'Categoria 2',
    description: 'Descrição da peça 2',
    imageUrl: '/2.png',
    condition: 'Usado',
  },
  // Adicione mais produtos conforme necessário
]
const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [priceRange, setPriceRange] = useState(500)
  const [selectedCondition, setSelectedCondition] = useState('')

  const filteredProducts = products.filter((product) => {
    return (
      (selectedCategory === '' || product.category === selectedCategory) &&
      product.price <= priceRange &&
      (selectedCondition === '' || product.condition === selectedCondition)
    )
  })

  return (
    <div className="bg-gray-900" style={{ backgroundColor: '#131616' }}>
      <h2 className="text-xxl font-bold text-white">Produtos</h2>
      <main className="container mx-auto py-8">
        <div className="flex gap-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 w-full md:w-2/3">
            {filteredProducts.map((product, index) => (
              <Suspense fallback={<div>Loading...</div>} key={index}>
                <ProductCard
                  name={product.name}
                  price={product.price}
                  category={product.category}
                  description={product.description}
                  imageUrl={product.imageUrl}
                  condition={product.condition}
                />
              </Suspense>
            ))}
          </div>
          <div className="hidden md:block w-1/3 p-4 bg-gray-900 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-white">Filtros</h2>
            <div className="mb-4">
              <label className="block text-gray-400">Categoria</label>
              <select
                className="w-full p-2 border rounded bg-gray-800 text-white"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Todas</option>
                <option value="Categoria 1">Categoria 1</option>
                <option value="Categoria 2">Categoria 2</option>
                {/* Adicione mais opções conforme necessário */}
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
              <div className="text-gray-400">R$ {priceRange},00</div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-400">Condição</label>
              <select
                className="w-full p-2 border rounded bg-gray-800 text-white"
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
              >
                <option value="">Todas</option>
                <option value="Novo">Novo</option>
                <option value="Usado">Usado</option>
              </select>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home

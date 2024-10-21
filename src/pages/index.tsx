import Image from 'next/image'
import Link from 'next/link'
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaShoppingCart,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaUser,
} from 'react-icons/fa'
import { useState } from 'react'

interface ProductCardProps {
  name: string
  price: number
  category: string
  description: string
  imageUrl: string
  condition: string
}

const products: ProductCardProps[] = [
  {
    name: 'Peça 1',
    price: 100,
    category: 'Categoria 1',
    description: 'Descrição da peça 1',
    imageUrl: '/1.jpg',
    condition: 'Novo',
  },
  {
    name: 'Peça 2',
    price: 200,
    category: 'Categoria 2',
    description: 'Descrição da peça 2',
    imageUrl: '/2.jpg',
    condition: 'Usado',
  },
  // Adicione mais produtos conforme necessário
]

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  category,
  description,
  imageUrl,
  condition,
}) => {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-md relative">
      <Image
        src={imageUrl}
        alt={name}
        width={300}
        height={200}
        className="w-full h-48 object-cover rounded-md"
      />
      <h2 className="text-xl font-bold mt-2">{name}</h2>
      <p className="text-gray-700">R$ {price},00</p>
      <p className="text-gray-500">{category}</p>
      <p className="text-gray-500">{condition}</p>
      <p className="text-gray-600 mt-2">{description}</p>
      <div className="flex justify-between mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Adicionar ao Carrinho
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Comprar Já
        </button>
      </div>
    </div>
  )
}

const ProductGrid: React.FC = () => {
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
    <div className="flex gap-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-2/3">
        {filteredProducts.map((product, index) => (
          <ProductCard
            key={index}
            name={product.name}
            price={product.price}
            category={product.category}
            description={product.description}
            imageUrl={product.imageUrl}
            condition={product.condition}
          />
        ))}
      </div>
      <div className="w-1/3 p-4 bg-gray-200 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Filtros</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Categoria</label>
          <select
            className="w-full p-2 border rounded"
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
          <label className="block text-gray-700">Preço até</label>
          <input
            type="range"
            className="w-full"
            min="0"
            max="1000"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
          />
          <div className="text-gray-700">R$ {priceRange},00</div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Condição</label>
          <select
            className="w-full p-2 border rounded"
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
  )
}

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-black text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">JRPECASCOMPLETE</h1>
          <nav className="space-x-4 flex items-center">
            <Link href="/">Home</Link>
            <Link href="/contact">Contacto</Link>
            <Link href="/location">Onde Estamos</Link>
            <Link href="/login">
              <div className="flex items-center space-x-2">
                <FaUser />
                <span>Sign In</span>
              </div>
            </Link>
          </nav>
        </div>
      </header>
      <section className="relative h-96">
        <Image
          src="/3.jpg"
          alt="Banner"
          layout="fill"
          objectFit="cover"
          className="w-full h-full"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <h2 className="text-white text-4xl font-bold">
            Peças de Carros à Venda
          </h2>
        </div>
      </section>
      <main className="container mx-auto py-8">
        <ProductGrid />
        <section className="my-8">
          <h2 className="text-2xl font-bold mb-4">Formas de Pagamento</h2>
          <div className="flex space-x-4">
            <FaCcVisa size={48} className="text-blue-600" />
            <FaCcMastercard size={48} className="text-red-600" />
            <FaCcPaypal size={48} className="text-blue-800" />
          </div>
        </section>
      </main>
      <footer className="bg-black text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 JRPECASCOMPLETE. Todos os direitos reservados.</p>
          <div className="flex justify-center mt-4 space-x-4">
            <FaFacebook className="text-blue-600" size={24} />
            <FaTwitter className="text-blue-400" size={24} />
            <FaInstagram className="text-pink-600" size={24} />
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home

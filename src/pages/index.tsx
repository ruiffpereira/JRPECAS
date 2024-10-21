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
  FaBars,
  FaTimes,
  FaFilter,
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
    <div className="border border-gray-700 rounded-lg p-4 bg-gray-800 shadow-md relative">
      <Image
        src={imageUrl}
        alt={name}
        width={300}
        height={200}
        className="w-full h-48 object-cover rounded-md"
      />
      <h2 className="text-xl font-bold mt-2 text-white">{name}</h2>
      <p className="text-red-500">R$ {price},00</p>
      <p className="text-gray-400">{category}</p>
      <p className="text-gray-400">{condition}</p>
      <p className="text-gray-300 mt-2">{description}</p>
      <div className="flex justify-between mt-4">
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full md:w-2/3">
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
  )
}

const Home: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [priceRange, setPriceRange] = useState(500)
  const [selectedCondition, setSelectedCondition] = useState('')

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-black text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
          <h1 className="text-3xl font-bold text-red-500">JRPECASCOMPLETE</h1>
          <nav className="hidden md:flex space-x-4 items-center">
            <Link href="/">Home</Link>
            <Link href="/contact">Contacto</Link>
            <Link href="/location">Onde Estamos</Link>
            <Link href="/login">
              <div className="flex items-center space-x-2">
                <FaUser />
              </div>
            </Link>
            <Link href="/cart">
              <div className="flex items-center space-x-2">
                <FaShoppingCart />
              </div>
            </Link>
          </nav>
          <button
            className="md:hidden"
            onClick={() => setFiltersOpen(!filtersOpen)}
          >
            <FaFilter size={24} />
          </button>
        </div>
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setMenuOpen(false)}
        ></div>
        <nav
          className={`fixed top-0 left-0 h-full bg-black text-white p-4 z-50 transform transition-transform duration-300 ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <Link
            href="/"
            className="block py-2"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/contact"
            className="block py-2"
            onClick={() => setMenuOpen(false)}
          >
            Contacto
          </Link>
          <Link
            href="/location"
            className="block py-2"
            onClick={() => setMenuOpen(false)}
          >
            Onde Estamos
          </Link>
          <Link
            href="/login"
            className="block py-2 flex items-center space-x-2"
            onClick={() => setMenuOpen(false)}
          >
            <FaUser />
            <span>Login</span>
          </Link>
          <Link
            href="/cart"
            className="block py-2 flex items-center space-x-2"
            onClick={() => setMenuOpen(false)}
          >
            <FaShoppingCart />
            <span>Carrinho</span>
          </Link>
        </nav>
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${filtersOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setFiltersOpen(false)}
        ></div>
        <div
          className={`fixed top-0 right-0 h-full bg-black text-white p-4 z-50 transform transition-transform duration-300 ${filtersOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
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
          <h2 className="text-2xl font-bold mb-4 text-white">
            Formas de Pagamento
          </h2>
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

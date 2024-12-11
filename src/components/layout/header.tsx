import { useCart } from '@/context/CartContext'
import Link from 'next/link'
import { useState } from 'react'
import { FiShoppingCart, FiUser, FiMenu, FiX } from 'react-icons/fi'

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const { cart } = useCart()

  return (
    <header className="bg-black text-white py-4 sticky top-0 z-10">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
        <Link href="/">
          <h1 className="text-3xl font-bold text-red-500">JRPECASCOMPLETE</h1>
        </Link>
        <nav className="hidden md:flex space-x-4 items-center">
          <Link href="/">Home</Link>
          <Link href="/">Contacto</Link>
          <Link href="/">Onde Estamos</Link>
          <Link href="/user">
            <div className="flex items-center space-x-2">
              <FiUser />
            </div>
          </Link>
          <Link href="/cart">
            <div className="flex items-center space-x-2 relative">
              <FiShoppingCart />
              <div className="absolute -top-2 -right-3 text-xs bg-red-500 text-white w-4 h-4 flex items-center justify-center rounded-full">
                {cart.length}
              </div>
            </div>
          </Link>
        </nav>
        <button
          className="md:hidden relative"
          onClick={() => setFiltersOpen(!filtersOpen)}
        >
          <FiShoppingCart />
          <div className="absolute -top-2 -right-3 text-xs bg-red-500 text-white w-4 h-4 flex items-center justify-center rounded-full">
            {cart.length}
          </div>
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
          href="/user"
          className=" py-2 flex items-center space-x-2"
          onClick={() => setMenuOpen(false)}
        >
          <FiUser />
          <span>Login</span>
        </Link>
      </nav>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${filtersOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setFiltersOpen(false)}
      ></div>
      <div
        className={`fixed top-0 right-0 h-full bg-black text-white p-4 z-50 transform transition-transform duration-300 ${filtersOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <h2 className="text-xl font-bold mb-4 text-white">Carrinho</h2>
      </div>
    </header>
  )
}

export default Header

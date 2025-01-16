import { useCart } from '@/context/CartContext'
import Link from 'next/link'
import { useState } from 'react'
import { FiShoppingCart, FiUser, FiMenu, FiX } from 'react-icons/fi'
import Image from 'next/image'
import { useSession, signIn } from 'next-auth/react'

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const { cart } = useCart()
  const { data: session } = useSession()
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
          {session ? (
            <Link href="/user">
              {session.user.image && (
                <Image
                  src={session.user.image}
                  alt={session.user.name || 'No name provided'}
                  width={20}
                  height={20}
                  className="rounded-full"
                />
              )}
            </Link>
          ) : (
            <button
              className="flex gap-2 items-center"
              onClick={() => signIn('google')}
            >
              <FiUser />
              <p>Login</p>
            </button>
          )}
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
        className={`fixed top-0 left-0 w-2/4 h-full bg-black text-white p-4 z-50 transform transition-transform duration-300 ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex gap-2 flex-col">
          {session ? (
            <Link
              href="/user"
              onClick={() => setMenuOpen(false)}
              className="flex gap-2 flex-col justify-start"
            >
              <p>Bem Vindo</p>
              <div className="flex gap-2 items-center">
                {session.user.image && (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || 'No name provided'}
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                )}
                <p>{session.user.name}</p>
              </div>
            </Link>
          ) : (
            <button
              className="flex gap-2 items-center"
              onClick={() => signIn('google')}
            >
              <FiUser />
              <p>Login</p>
            </button>
          )}

          <Link onClick={() => setMenuOpen(false)} href="/">
            Home
          </Link>
          <Link onClick={() => setMenuOpen(false)} href="/">
            Contacto
          </Link>
          <Link onClick={() => setMenuOpen(false)} href="/">
            Onde Estamos
          </Link>
        </div>
      </nav>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${filtersOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setFiltersOpen(false)}
      ></div>
      <div
        className={`fixed top-0 right-0 h-full bg-black text-white p-4 z-50 transform transition-transform duration-300 ${filtersOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="overflow-auto h-full">
          <h2 className="text-xl font-bold mb-4 text-white">Carrinho</h2>
          {cart.length === 0 ? (
            <p className="text-white">Seu carrinho está vazio.</p>
          ) : (
            <div className="">
              <table className="min-w-full text-white mb-4">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b border-gray-700">
                      Imagem
                    </th>
                    <th className="py-2 px-4 border-b border-gray-700">
                      Preço
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-700">
                      <td className="py-2 px-4 border-b border-gray-700">
                        <div className="relative w-24 h-24">
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            objectFit="contain"
                            className="rounded-md"
                          />
                        </div>
                      </td>
                      <td className="py-2 px-4 border-b border-gray-700">
                        {item.price}€
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Link href="/cart">
                <div
                  className="flex items-center space-x-2 relative"
                  onClick={() => setFiltersOpen(false)}
                >
                  Ver Carrinho
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header

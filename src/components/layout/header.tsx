import { useProducts } from '@/context/ProductsContext'
import Link from 'next/link'
import { useState } from 'react'
import { FiShoppingCart, FiUser, FiMenu, FiX } from 'react-icons/fi'
import { FaBox } from 'react-icons/fa'

import Image from 'next/image'
import { useSession, signIn, signOut } from 'next-auth/react'

const URL_RAIZ = process.env.NEXT_PUBLIC_CONTAINERRAIZ

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const { cart, handleSearchChange, searchProduct } = useProducts()
  const { data: session } = useSession()

  return (
    <header className="bg-black text-white py-4 sticky top-0 z-10 flex-shrink-0">
      <div className="container mx-auto px-4 flex md:justify-between items-center gap-4">
        <button
          className="md:hidden mr-2"
          onClick={() => {
            setMenuOpen(!menuOpen)
          }}
        >
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
        <Link className="truncate" href="/">
          <h1 className="text-xl md:text-3xl font-bold text-red-500 truncate">
            JRPECASCOMPLETE
          </h1>
        </Link>
        <input
          type="text"
          className="py-2 px-4 flex-grow rounded md:max-w-sm bg-gray-800 text-white hidden lg:block"
          placeholder="Pesquisar por um artigo"
          value={searchProduct}
          onChange={handleSearchChange}
        />
        <nav className="hidden md:flex space-x-4 items-center">
          <Link href="/about">Sobre Nós</Link>
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
        <div className="flex gap-4 items-center ml-auto md:hidden">
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
          <button
            className="relative mr-2"
            onClick={() => {
              setCartOpen(!cartOpen)
            }}
          >
            <FiShoppingCart />
            {cart.length > 0 && (
              <div className="absolute -top-3 -right-4 text-xs bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full">
                {cart.length}
              </div>
            )}
          </button>
        </div>
      </div>
      <div
        className={`md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${menuOpen || cartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => {
          setCartOpen(false)
          setMenuOpen(false)
        }}
      ></div>
      <nav
        className={`md:hidden fixed top-0 left-0 w-3/4 h-full bg-gray-900 text-white p-4 z-50 transform transition-transform duration-300 ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex gap-4 flex-col h-full">
          {session ? (
            <div className="flex gap-4 flex-col">
              <Link
                href="/user"
                onClick={() => setMenuOpen(false)}
                className="flex gap-2 flex-col justify-start"
              >
                <p>Bem Vindo</p>
                <div className="flex gap-2 items-center mb-4">
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
              <Link
                className="flex gap-2 items-center"
                onClick={() => {
                  setMenuOpen(false)
                }}
                href="/orders"
              >
                <FaBox className="text-red-500" />
                As minhas encomendas
              </Link>
              <button
                onClick={() => signOut()}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              className="flex gap-2 items-center"
              onClick={() => signIn('google')}
            >
              <FiUser />
              <p>Login</p>
            </button>
          )}

          <Link
            className="mt-auto"
            onClick={() => {
              setMenuOpen(false)
            }}
            href="/about"
          >
            Sobre Nós
          </Link>
        </div>
      </nav>
      <nav
        className={`md:hidden fixed top-0 right-0 h-full bg-gray-900 w-3/4 text-white p-4 z-50 transform transition-transform duration-300 ${cartOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="overflow-auto h-full flex flex-col gap-2">
          <h2 className="text-xl font-bold mb-4 text-white flex-shrink-0">
            Carrinho
          </h2>
          {cart.length === 0 ? (
            <p className="text-white">Seu carrinho está vazio.</p>
          ) : (
            <div className="flex flex-col gap-4 overflow-hidden flex-grow h-full">
              <div className="flex flex-col gap-4 overflow-auto">
                {cart.map((item, index) => {
                  // const modifiedPhotoUrl = item.photos[0].slice(2)
                  return (
                    <div
                      key={index}
                      className="rounded-md flex gap-4 items-center p-4 bg-slate-800"
                    >
                      <div className="w-20 h-20 overflow-hidden relative flex-shrink-0">
                        {/* <Image
                          src={`${URL_RAIZ}/${modifiedPhotoUrl}`}
                          alt={item.name}
                          fill
                          objectFit="contain"
                        /> */}
                      </div>
                      <div className="flex gap-2 flex-col">
                        {/* <p>{item.name}</p>
                        <div className="text-red-700">{item.price}€</div> */}
                      </div>
                    </div>
                  )
                })}
              </div>
              <Link
                className={`flex-shrink-0 ${cart.length === 0 && 'hidden'}`}
                href="/cart"
              >
                <div
                  className="flex items-center space-x-2 relative"
                  onClick={() => {
                    setCartOpen(false)
                  }}
                >
                  Ver Carrinho
                </div>
              </Link>
            </div>
          )}
        </div>
      </nav>
      <div className="container mx-auto px-4 lg:hidden mt-2">
        <input
          type="text"
          className="py-2 px-4 rounded bg-gray-800 text-white w-full"
          placeholder="Pesquise por um artigo"
          value={searchProduct}
          onChange={handleSearchChange}
        />
      </div>
    </header>
  )
}

export default Header

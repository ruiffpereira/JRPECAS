import { useProducts } from '@/context/ProductsContext'
import Link from 'next/link'
import { useState } from 'react'
import { FiShoppingCart, FiUser, FiMenu, FiX } from 'react-icons/fi'
import { FaBox } from 'react-icons/fa'
import Image from 'next/image'
import { useSession, signOut, signIn } from 'next-auth/react'
import routes from '@/routes'

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const { cart, handleSearchChange, searchProduct } = useProducts()
  const { data: session } = useSession()

  const totalCart = cart.products.reduce(
    (acc, item) => acc + (item.quantity || 0),
    0,
  )

  return (
    <header className="sticky top-0 z-20 flex-shrink-0 bg-black py-4 text-white">
      <div className="absolute bottom-0 left-0 right-0 h-[1px] w-full bg-gradient-to-r from-red-500 via-yellow-400 to-red-500 opacity-70" />

      <div className="container mx-auto flex items-center gap-4 px-4 md:justify-between">
        <button
          className="mr-2 md:hidden"
          onClick={() => {
            setMenuOpen(!menuOpen)
          }}
        >
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
        <Link className="truncate" href="/">
          <h1 className="truncate text-xl font-bold text-red-500 md:text-3xl">
            Complete Peças Usadas
          </h1>
        </Link>
        <input
          type="text"
          className="hidden flex-grow rounded bg-gray-800 px-4 py-2 text-center text-white md:max-w-sm lg:block"
          placeholder="Pesquisar por um artigo"
          value={searchProduct}
          onChange={handleSearchChange}
        />
        <nav className="hidden items-center space-x-4 md:flex">
          <Link href="/about">Sobre Nós</Link>
          {session ? (
            <>
              <Link href={routes.user}>
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
              <Link href={routes.orders}>
                <FaBox />
              </Link>
            </>
          ) : (
            <Link href={routes.login} className="flex items-center gap-2">
              <FiUser />
              Login
            </Link>
          )}
          <Link href="/cart">
            <div className="relative flex items-center space-x-2">
              <FiShoppingCart />
              <div className="absolute -right-3 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {totalCart}
              </div>
            </div>
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-4 md:hidden">
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
            <Link href={routes.login} className="flex items-center gap-2">
              <FiUser />
              Login
            </Link>
          )}
          <button
            className="relative mr-2"
            onClick={() => {
              setCartOpen(!cartOpen)
            }}
          >
            <FiShoppingCart />
            {cart.products.length > 0 && (
              <div className="absolute -right-4 -top-3 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {cart.products.length}
              </div>
            )}
          </button>
        </div>
      </div>
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300 md:hidden ${menuOpen || cartOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={() => {
          setCartOpen(false)
          setMenuOpen(false)
        }}
      ></div>
      <nav
        className={`fixed left-0 top-0 z-50 h-full w-3/4 transform bg-gray-900 p-4 text-white transition-transform duration-300 md:hidden ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex h-full flex-col gap-4">
          {session ? (
            <div className="flex flex-col gap-4">
              <Link
                href="/user"
                onClick={() => setMenuOpen(false)}
                className="flex flex-col justify-start gap-2"
              >
                <p>Bem Vindo</p>
                <div className="mb-4 flex items-center gap-2">
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
                className="flex items-center gap-2"
                onClick={() => {
                  setMenuOpen(false)
                }}
                href="/cart"
              >
                <FaBox className="text-red-500" />
                Carrinho
              </Link>
              <Link
                className="flex items-center gap-2"
                onClick={() => {
                  setMenuOpen(false)
                }}
                href="/orders"
              >
                <FiShoppingCart className="text-red-500" />
                As minhas encomendas
              </Link>
              <button
                onClick={() => signOut()}
                className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href={routes.login}
              className="flex items-center gap-2"
              onClick={() => setMenuOpen(false)}
            >
              <FiUser />
              Login
            </Link>
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
        className={`fixed right-0 top-0 z-50 h-full w-3/4 transform bg-gray-900 p-4 text-white transition-transform duration-300 md:hidden ${cartOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex h-full flex-col gap-2 overflow-auto">
          <h2 className="mb-4 flex-shrink-0 text-xl font-bold text-white">
            Carrinho
          </h2>
          {cart.products.length === 0 ? (
            <p className="text-white">Seu carrinho está vazio.</p>
          ) : (
            <div className="flex h-full flex-grow flex-col gap-4 overflow-hidden">
              <div className="flex flex-col gap-4 overflow-auto">
                {cart.products.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-4 rounded-md bg-slate-800 p-4"
                    >
                      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_CONTAINERRAIZ}/${item.photos?.[0].slice(2) ?? ''}`}
                          alt={item.name || 'Product image'}
                          fill
                        />
                      </div>
                      <div className="flex flex-grow flex-col gap-2">
                        <p>{item.name}</p>
                        <div className="flex justify-between gap-2">
                          <div>{item.price}€</div>
                          <div>{item.quantity}€</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              <Link
                className={`flex-shrink-0 ${cart.products.length === 0 && 'hidden'}`}
                href="/cart"
              >
                <div
                  className="relative flex items-center space-x-2"
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
      <div className="container mx-auto mt-2 px-4 lg:hidden">
        <input
          type="text"
          className="w-full rounded bg-gray-800 px-4 py-2 text-white"
          placeholder="Pesquise por um artigo"
          value={searchProduct}
          onChange={handleSearchChange}
        />
      </div>
    </header>
  )
}

export default Header

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'
import { Cart, Product } from '@/types/types'
import { useSession } from 'next-auth/react'
import { getCartProducts } from '@/pages/api/products'

interface ProductsContextProps {
  products: Product[]
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>
  setDBCart: React.Dispatch<React.SetStateAction<Product[]>>
  cart: Cart[]
  setCart: React.Dispatch<React.SetStateAction<Cart[]>>
  addToCart: (item: Cart) => void
  searchProduct: string
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ProductsContext = createContext<ProductsContextProps | undefined>(
  undefined,
)

export const ProductsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([])
  const [dbCart, setDBCart] = useState<Cart[]>([])
  const [cart, setCart] = useState<Cart[]>([])
  const [searchProduct, setSearchProduct] = useState('')
  const { data: session } = useSession()

  if (dbCart.length > 0 && products.length > 0) {
    const updatedCart: Cart[] = dbCart.map((item) => {
      const product = products.find(
        (product) => product.productId === item.productId,
      )
      return {
        ...item,
        name: product?.name || '',
        photo: product?.photos[0].slice(2) || '',
        price: product?.price || 0,
        quantity: 1,
      }
    })
    setCart(updatedCart)
  }

  useEffect(() => {
    console.log('session:', session)
    const fetchCartProducts = async () => {
      console.log('session:', session)
      if (session) {
        const token = session.user.token // Substitua pelo token correto
        if (token) {
          const cartProducts = await getCartProducts(token)
          console.log('cartProducts:', cartProducts)

          if (cartProducts.length > 0) {
            cartProducts.map((product) => {
              console.log(product)
              return true
            })
          }
          setDBCart(cartProducts)
        }
      }
    }
    fetchCartProducts()
  }, [session])

  const addToCart = (item: Cart) => {
    setCart((prevCart) => [...prevCart, item])
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchProduct(e.target.value)
  }

  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
        cart,
        setCart,
        setDBCart,
        addToCart,
        searchProduct,
        handleSearchChange,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export const useProducts = (): ProductsContextProps => {
  const context = useContext(ProductsContext)
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider')
  }
  return context
}

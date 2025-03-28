import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'
import { Cart, Product, AddCart } from '@/types/types'
import { useSession } from 'next-auth/react'
import { addCartProducts, getCartProducts } from '@/pages/api/products'

interface ProductsContextProps {
  products: Product[]
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>
  cart: Cart
  setCart: React.Dispatch<React.SetStateAction<Cart>>
  addToCart: (item: AddCart) => void
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
  const [cart, setCart] = useState<Cart>({ products: [], shipPrice: 0 })
  const [searchProduct, setSearchProduct] = useState('')
  const { data: session } = useSession()

  useEffect(() => {
    const fetchCartProducts = async () => {
      if (session) {
        const token = session.user.token
        if (token) {
          try {
            const response = await getCartProducts(token)
            if ((response as Response).ok) {
              const cartProducts = await (response as Response).json()
              setCart(cartProducts)
            } else {
              setCart({ products: [], shipPrice: 0 })
            }
          } catch {
            setCart({ products: [], shipPrice: 0 })
          }
        }
      }
    }
    fetchCartProducts()
  }, [session])

  const addToCart = async (item: AddCart) => {
    if (session) {
      const token = session.user.token
      if (token) {
        try {
          const response = await addCartProducts(token, item)
          if (response.ok) {
            const cartProducts = await response.json()
            setCart(cartProducts)
          } else {
            // console.error('Failed kto add product to cart:', response.statusText)
          }
        } catch {
          // console.error('Error adding product to cart:', error)
        }
      }
    }
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

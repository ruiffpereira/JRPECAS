import React, { createContext, useContext, useState, ReactNode } from 'react'
import { Cart, Product, dbCart } from '@/types/types'

interface ProductsContextProps {
  products: Product[]
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>
  setDBCart: React.Dispatch<React.SetStateAction<dbCart[]>>
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
  const [dbCart, setDBCart] = useState<dbCart[]>([])
  const [cart, setCart] = useState<Cart[]>([])
  const [searchProduct, setSearchProduct] = useState('')

  if (dbCart.length > 0 && products.length > 0) {
    const updatedCart: Cart[] = dbCart.map((item) => {
      const product = products.find((p) => p.productId === item.productId)
      return {
        ...item,
        name: product?.name || '',
        photo: product?.photos[0].slice(2) || '',
        price: product?.price || 0,
      }
    })
    setCart(updatedCart)
  }

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

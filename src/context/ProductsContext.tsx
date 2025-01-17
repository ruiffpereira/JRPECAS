import React, { createContext, useContext, useState, ReactNode } from 'react'
import { Product } from '@/types/types'

interface ProductsContextProps {
  products: Product[]
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>
  cart: Product[]
  addToCart: (item: Product) => void
  activeSearch: boolean
  setActiveSearch: React.Dispatch<React.SetStateAction<boolean>>
}

const ProductsContext = createContext<ProductsContextProps | undefined>(
  undefined,
)

export const ProductsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([])
  const [cart, setCart] = useState<Product[]>([])
  const [activeSearch, setActiveSearch] = useState(false)

  const addToCart = (item: Product) => {
    setCart((prevCart) => [...prevCart, item])
  }

  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
        cart,
        addToCart,
        activeSearch,
        setActiveSearch,
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

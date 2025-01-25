import React, { createContext, useContext, useState, ReactNode } from 'react'
import { Cart, Product } from '@/types/types'

interface ProductsContextProps {
  products: Product[]
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>
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
  const [cart, setCart] = useState<Cart[]>([])
  const [searchProduct, setSearchProduct] = useState('')

  const addToCart = (item: Cart) => {
    // setCart((prevCart) => [...prevCart, item])
    console.log('item: ', item)
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

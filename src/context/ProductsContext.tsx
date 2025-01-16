import React, { createContext, useContext, useState, ReactNode } from 'react'
import { Product } from '@/types/types'

interface ProductsContextProps {
  products: Product[]
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>
}

const ProductsContext = createContext<ProductsContextProps | undefined>(
  undefined,
)

export const ProductsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([])

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
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

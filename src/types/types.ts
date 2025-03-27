export interface ProductCategory {
  name: string
  category: string
}

export interface ProductSubCategory {
  name: string
  subcategory: string
}

export interface Product {
  productId: string
  name: string
  description: string
  price: number
  photos: string
  category: ProductCategory
  subcategory: ProductSubCategory
}

export interface CartProduct {
  productId: string
  name: string
  price: string // Se o preço for uma string, mantenha assim; caso contrário, use `number`
  photos: string[]
  quantity: number
}

export interface Cart {
  products: CartProduct[]
  shipPrice: number
}

export interface AddCart {
  productId: string
  quantity: number
}

declare module 'next-auth' {
  interface User {
    token: string
    customerId: string
  }

  interface Session {
    user: {
      image: string
      name: string
      token: string
      email: string
      customerId: string
    }
  }
}

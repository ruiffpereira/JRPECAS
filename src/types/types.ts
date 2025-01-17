export interface ProductCategory {
  name: string
  category: string
}

export interface ProductSubCategory {
  name: string
  subcategory: string
}

export interface Product {
  productId: number
  name: string
  description: string
  price: number
  photos: string
  category: ProductCategory
  subcategory: ProductSubCategory
}

declare module 'next-auth' {
  interface User {
    token?: string
  }

  interface Session {
    user: {
      image: string
      name: string
      token?: string
      email: string
    }
  }
}

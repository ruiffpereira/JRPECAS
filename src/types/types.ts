export interface Product {
  productId: number
  name: string
  description: string
  price: number
  photos: string[]
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

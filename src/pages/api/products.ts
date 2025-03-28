import { AddCart } from '@/types/types'
import { fetchWithAuth } from './auth-token'

export const getAllProducts = async (token: string) => {
  try {
    const response = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/websites/products`,
      token,
    )
    return response
  } catch {
    // console.error('Error fetching products:', error)
    // throw new Error('An error occurred while fetching products')
  }
}

export const getCartProducts = async (token: string) => {
  try {
    const response = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/carts`,
      token,
    )
    return response
  } catch (error) {
    // console.error('Error fetching products:', error)
    return error
    // throw new Error('An error occurred while fetching products')
  }
}

export const addCartProducts = async (token: string, data: AddCart) => {
  try {
    const response = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/carts`,
      token,
      {
        method: 'POST',
        body: JSON.stringify({
          quantity: data.quantity,
          productId: data.productId,
        }),
      },
    )
    return response
  } catch {
    // console.error('Error adding products to cart:', error)
    throw new Error('An error occurred while adding products to cart')
  }
}

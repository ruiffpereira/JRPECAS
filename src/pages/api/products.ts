import { fetchWithAuth } from './auth-token'

export const getAllProducts = async (token: string) => {
  try {
    const response = await fetchWithAuth(
      `${process.env.API_BASE_URL}/websites/products`,
      token,
    )
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching products:', error)
    // throw new Error('An error occurred while fetching products')
  }
}

export const getCartProducts = async (token: string) => {
  try {
    const response = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/carts`,
      token,
    )
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching products:', error)
    // throw new Error('An error occurred while fetching products')
  }
}

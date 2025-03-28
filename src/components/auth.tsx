import { signIn, getSession } from 'next-auth/react'
import { getCartProducts } from '@/pages/api/products'

export const LoginAndAddToCart = async (
  event: React.MouseEvent<HTMLButtonElement>,
) => {
  event.preventDefault()

  const result = await signIn('google', { redirect: false })
  if (result?.error) {
    // console.error('Login failed:', result.error)
  }
  const session = await getSession()
  if (session) {
    await getCartProducts(session.user.token)
    // console.log('cartProducts', cartProducts)
  }
}

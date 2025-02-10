import { signIn, getSession } from 'next-auth/react'
import { getCartProducts } from '@/pages/api/products'
import { useProducts } from '@/context/ProductsContext'

export const LoginAndAddToCart = async (
  event: React.MouseEvent<HTMLButtonElement>,
) => {
  event.preventDefault()
  const { setCart } = useProducts()

  console.log('LoginAndAddToCart')
  const result = await signIn('google', { redirect: false })
  if (result?.error) {
    console.error('Login failed:', result.error)
  }
  const session = await getSession()
  if (session) {
    // Adicione os produtos ao carrinho

    const cartProducts = await getCartProducts(session.user.token)
    console.log('cartProducts', cartProducts)
    setCart(cartProducts)
  }
}

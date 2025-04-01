import { signIn, getSession } from 'next-auth/react'

export const LoginAndAddToCart = async (
  event: React.MouseEvent<HTMLButtonElement>,
) => {
  event.preventDefault()

  await signIn('google', { redirect: false })
  getSession()
}

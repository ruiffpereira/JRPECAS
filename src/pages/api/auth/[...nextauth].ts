import { postWebsitesCustomerslogin } from '@/server/customers/hooks/usePostWebsitesCustomersLogin'
import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'

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

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope:
            'openid profile email https://www.googleapis.com/auth/user.phonenumbers.read',
        },
      },
    }),
    // Adicione mais provedores conforme necessário
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        try {
          if (!account.id_token) return false

          const customer = await postWebsitesCustomerslogin(
            {
              idToken: account.id_token,
            },
            {
              headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
              },
            },
          )
          if (user && customer && customer.customerId) {
            user.token = customer.token || ''
            user.customerId = customer.customerId
            return true
          } else {
            console.error('Failed to authenticate user')
            return false
          }
        } catch (error) {
          console.error('Error during signIn callback:', error)
          return false
        }
      }

      return true
    },
    async redirect({ baseUrl }) {
      return baseUrl
    },
    async jwt({ token, user }) {
      if (user) {
        token.token = user.token
        token.customerId = user.customerId
      }
      return token
    },
    async session({ session, token }) {
      session.user.token = token.token as string
      session.user.customerId = token.customerId as string
      return session
    },
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  session: {
    strategy: 'jwt',
    maxAge: 5 * 24 * 60 * 60, // 6 dias
  },
})

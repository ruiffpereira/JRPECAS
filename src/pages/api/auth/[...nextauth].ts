import { postWebsitesCustomersAutenticationLogin } from '@/servers/customers/hooks/usePostWebsitesCustomersAutenticationLogin'
import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

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
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'your@email.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Aqui deve chamar a sua API/backend para validar o utilizador
        const customer = await postWebsitesCustomersAutenticationLogin(
          {
            provider: 'credentials',
            email: credentials?.email,
            password: credentials?.password,
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
            },
          },
        )
        if (customer && customer.customerId && customer.token) {
          return {
            id: customer.customerId,
            name: customer.name,
            email: customer.email,
            image: customer.photo,
            token: customer.token,
            customerId: customer.customerId,
          }
        }
        return null
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        try {
          if (!account.id_token) return false

          const customer = await postWebsitesCustomersAutenticationLogin(
            {
              provider: 'google',
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
    maxAge: 3 * 24 * 60 * 60, // 3 dias
  },
})

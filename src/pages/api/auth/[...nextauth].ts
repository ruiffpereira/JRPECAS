import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

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
          const res = await fetch(
            `${process.env.API_BASE_URL}/customers/login`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.API_SECRET_TOKEN}`,
              },
              body: JSON.stringify({
                user,
                secretkeysite: process.env.WEBSITE_KEY,
              }),
            },
          )

          const data = await res.json()
          if (res.ok && data) {
            user.token = data.token
            user.customerId = data.customer.customerId
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
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name
        token.email = user.email
        token.acessToken = user.token
        token.customerId = user.customerId
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.token = token.acessToken as string
        session.user.customerId = token.customerId as string
      }

      // console.log('session', session)
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

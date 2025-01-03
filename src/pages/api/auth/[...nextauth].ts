import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error(
    'Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET environment variables',
  )
}

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
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
    async signIn({ user, account, profile, email, credentials }) {
      // Enviar dados para o endpoint externo
      // const response = await fetch(
      //   'https://your-endpoint-url.com/api/saveUser',
      //   {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({
      //       user,
      //       account,
      //       profile,
      //       email,
      //       credentials,
      //     }),
      //   },
      // )

      // if (!response.ok) {
      //   console.error('Failed to send data to the endpoint')
      //   return false
      // }

      return true
    },
    async session({ session, token, user }) {
      console.log('session', session, token, user)
      return session
    },
  },
})

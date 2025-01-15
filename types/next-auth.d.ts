import NextAuth from 'next-auth'

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

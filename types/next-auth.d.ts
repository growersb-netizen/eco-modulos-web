import NextAuth, { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      nombre: string
      rol: string
    } & DefaultSession['user']
  }

  interface User {
    id: string
    nombre: string
    rol: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    nombre: string
    rol: string
  }
}

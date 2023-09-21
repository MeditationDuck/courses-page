import { UserRole } from '@prisma/client'
import type { User } from 'next-auth'
import 'next-auth/jwt'

// type UserId = string

declare module 'next-auth/jwt' {
  interface JWT {
    userId: string
    email: string
    role: UserRole
  }
}

declare module 'next-auth' {
  interface Session {
    user: User & { 
      userId: string
      email: string
      role: UserRole
    }
  }
}
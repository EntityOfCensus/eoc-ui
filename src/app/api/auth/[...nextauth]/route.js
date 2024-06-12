// Third-party Imports
import NextAuth from 'next-auth'

// Lib Imports
import { authOptions } from '@/libs/auth'

const handler = NextAuth(authOptions)

export const runtime = 'edge' // 'nodejs' (default) | 'edge'

export { handler as GET, handler as POST }

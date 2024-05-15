// Third-party Imports
import Auth0Provider from 'next-auth/providers/auth0'













//TODO future implementation directly with auth0 and wallet management inside the app
export const authOptions = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER
    })
  ],

  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 // 1 hour
  },

  pages: {
    signIn: '/login.js'
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name
      }

      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.name = token.name
      }

      return session
    }
  }
}

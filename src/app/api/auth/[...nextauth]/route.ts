import prisma from "@/lib/prisma";
import { Account, AuthOptions, Profile, Session, User} from "next-auth";
import  CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import { PrismaAdapter } from "@next-auth/prisma-adapter";


export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },

      authorize: async (credentials) => {
        if(!credentials) return null;

        const { email, password } = credentials

        const user =  await prisma.user.findUnique({
          where: { email }
        })

        if(!user) return null

        const userPassword = user.passwordHash

        if(userPassword){
          const isValidPassword = bcrypt.compareSync(password, userPassword)
          if(!isValidPassword) return null
        }
        return user
      }
    })
  ],
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/signin',
    signOut: '/signout',
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    async encode({ secret, token }) {
      if(!token) throw new Error('No token to encode');

      return jwt.sign(token,secret)
    },
    async decode({ secret, token }) {
      if(!token) throw new Error('No token to decode');

      const decodedToken = jwt.verify(token, secret)

      if( typeof decodedToken === 'string') {
        return JSON.parse(decodedToken)
      }else {
        return decodedToken
      }
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async session(params: {session: Session; token: JWT; user:User}) {
      if(params.session.user){
        params.session.user.userId = params.token.userId
        params.session.user.email = params.token.email
        params.session.user.role = params.token.role
      }
      return params.session
    },
    async jwt(params: {
      token: JWT; 
      user?: User | undefined ; 
      account?: Account | null | undefined;
      profile?: Profile | undefined; 
      isNewUser?: boolean | undefined;
    }) {
      if(params.user && params.user.email){
        params.token.userId = params.user.id
        params.token.email = params.user.email
        params.token.role = params.user.role
      }
      return params.token;
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST}
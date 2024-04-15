import { PrismaAdapter } from "@auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import crypto from "@/server/lib/crypto";
import { db } from "@/server/db";
import { type User } from "@/server/lib/types";


declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & User
  }
}

export const authOptions: NextAuthOptions = {
  session:{
    strategy: 'jwt'
  },
  pages: {
    signIn: '/'
  },
  callbacks: {
    jwt: async ({token, user}) => {
      user && (token.user = user)
      return Promise.resolve(token)
    },
    session: ({ session, token }) => {
      const user: User = token.user as User

      return ({
      ...session,
      user: {
        ...session.user,
        ...user
      },
    })},
  },
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    // Login with username and password
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Usuario',
          type: 'text',
          placeholder: 'usuarioPrueba'
        },
        password: { label: 'Contraseña', type: 'password', placeholder: 'pass123'}
      },
      async authorize(credentials){
      // Find user in database
      const dbUser = await db.user.findUnique({
        where: {
          username: credentials?.username
        }
      })

      // If user is not found, return null
      if (!dbUser) return null

      // Checks if password is ok
      const isPasswordOK = crypto().compareWithHash(credentials!.password, dbUser.password)

      if (isPasswordOK) return dbUser
      return null
    }})
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};

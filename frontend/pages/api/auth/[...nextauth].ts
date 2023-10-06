import axios from "axios";
import NextAuth, { NextAuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";

import CredentialsProvider from "next-auth/providers/credentials";

type Token = {
  user: {
    id: number;
    token: string;
    email: string;
    isWeb3Activated: boolean;
    isActivated: boolean;
  }
  token: string
} & JWT

export default async function auth(req: any, res: any) {
  const authOptions: NextAuthOptions = {
    providers: [
      CredentialsProvider({
        id: 'eth',
        name: "3.0",
        credentials: {
          message: {
            label: "Message",
            type: "text",
            placeholder: "0x0",
          },
          signature: {
            label: "Signature",
            type: "text",
            placeholder: "0x0",
          },
          address: {
            label: "Address",
            type: "text",
          }
        },
        async authorize(credentials) {
          try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_LINK}/api/users/verify`, {
              message: credentials?.message,
              signature: credentials?.signature,
            })
            if (res.data.status === 'success') {
              const user = { ...res.data.data.user, accessToken: res.data.token }
              return user
            }
            return null
          } catch (e) {
            return null
          }
        },
      }),
    ],
    callbacks: {
      jwt({ token, user, trigger, session }) {
        if (trigger === 'update') {
          return { ...token, ...session }
        }
        return {
          ...token, ...user
        } as any

      },
      session({ session, user, token }: { session: Session, user: any, token: JWT }) {
        session.isActivated = token.isActivated
        session.token = token.accessToken
        session.userId = token._id
        session.user = undefined
        return session
      },

    },
    pages: {
      signIn: '/login'
    },
    session: {
      strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET

  }

  return await NextAuth(req, res, { ...authOptions })
}
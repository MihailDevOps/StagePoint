import "next-auth/jwt"
import NextAuth from "next-auth/next"


declare module "next-auth/jwt" {
  interface JWT {
    _id: string;
    accessToken: string;
    email: string;
    isWeb3Activated: boolean;
    isActivated: boolean;
  }
  interface User {
    accessToken: string;
    id: string;
  }
}

declare module 'next-auth' {
  interface Session {
    userId: string;
    token: string;
    isActivated: boolean;
  }

}

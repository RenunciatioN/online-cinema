import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      email: string
      isAdmin: boolean;
      isMainAdmin: boolean;
      favorites: string[];
      createdAt: string;
    };
    refreshToken: string
    accessToken: string
  }
}

import {JWT} from 'next-auth/jwt'

declare module 'next-auth/jwt' {
    interface JWT {
        user: {
          _id: string;
          email: string
          isAdmin: boolean;
          isMainAdmin: boolean;
          favorites: string[];
          createdAt: string;
        };
        refreshToken: string
        accessToken: string
      }
}
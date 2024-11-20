import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../../lib/prisma";
import { compare } from "bcrypt";
import { signIn } from "next-auth/react";

interface User {
  id: string;
  name: string | null;
  email: string;
  password: string | null;
  image: string | null;
}

export const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) : Promise<User | null>  {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email as string },
        });

        if (
          user &&
          (await compare(credentials?.password || "", user.password as string))
        ) {
          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            password: user.password,
            image: user.image,
          };;
        }
        return null;
      },
    }),
  ],

  pages: {
    error: "/auth/error",
  },

  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.provider = account.provider;
      }

      if (user) {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email as string },
        });

        if (!existingUser) {
          await prisma.user.create({
            data: {
              name: user.name as string,
              email: user.email as string,
              image: user.image || "" as string,
              password: null, 
            },
          });
        }

        token.user = user;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = token.user as User;
      session.accessToken = token.accessToken as string;
      session.provider = token.provider as string;
      console.log(session);

      return session;
    },
  },



  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };

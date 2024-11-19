import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import prisma from "../../../../lib/prisma";

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
          where: { email: user.email  as string},
        });

      
        if (!existingUser) {
          await prisma.user.create({
            data: {
              name: user.name || "",
              email: user.email as string,
              image: user.image || "",
            },
          });
        }
      }

      return token;
    },


    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.provider = token.provider as string;
      console.log(session)
     

      return session;
    },
  },

  session: {
    strategy: "jwt",
  },

  
});

export { handler as GET, handler as POST };

import type { NextAuthOptions, User as AuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "regular_credentials",
      name: "Sign in with credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as { email: string; password: string };
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async jwt({ token, user, account, profile }) {
      return token;
    },
    async session({ session, user, token }) {
      return session;
    },
  },
};

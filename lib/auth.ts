import { NextAuthOptions } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from './prisma';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      async sendVerificationRequest(params) {
        console.log('Magic link email params:', params);
        // Default behavior: send the email using nodemailer
        // NextAuth will handle sending the email if this is not overridden
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    verifyRequest: '/auth/verify-request',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    session: async ({ session, token }) => {
      console.log('Session callback:', { session, token });
      if (session?.user && token?.sub) {
        (session.user as typeof session.user & { id: string }).id = token.sub as string;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      console.log('JWT callback:', { user, token });
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
};
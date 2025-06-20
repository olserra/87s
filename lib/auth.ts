import { NextAuthOptions } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from './prisma';
import nodemailer from 'nodemailer';

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
      async sendVerificationRequest({ identifier, url, provider, theme }) {
        try {
          const transport = nodemailer.createTransport(provider.server);
          const result = await transport.sendMail({
            to: identifier,
            from: provider.from,
            subject: 'Your sign-in link for PodcastAI',
            text: `Sign in to PodcastAI using this link: ${url}`,
            html: `<p>Sign in to PodcastAI using this link: <a href="${url}">${url}</a></p>`
          });
          console.log('Magic link sent to:', identifier, 'Result:', result);
        } catch (error) {
          console.error('Error sending magic link:', error);
          throw error;
        }
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
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { connectToDB } from './utils/database';
import User from './app/models/user';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import {authConfig} from './auth.config';
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      async authorize(credentials) {
        if (credentials === null) return null;
        try {
          await connectToDB();
          console.log('Connected to DB');

          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            console.error('User not found');
            return null;
          }
          //console.log('User found:', user);

          const isMatch = await bcrypt.compare(credentials.password, user.password);
          if (!isMatch) {
            console.error('Invalid credentials');
            return null;
          }
          console.log('Password matched');

          return {
            //id: user._id.toString(),
            //email: user.email,
            //username: user.username,
            user
          };
        }
        catch (error) {
          console.error(error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        //console.log("User in JWT callback:", user);
        token.id = user.id;
        //token.username = user.username; // Add username to the token
        token = user;
      }
      return token;
    },
    async session({ session, token }) {
      //console.log("Session data:", session);
      //session.user.id = token.id;
      //session.user.username = token.username; // Add username to the session
      session = token;
      //console.log('and',session.one);
      return session;
    },
  },
});
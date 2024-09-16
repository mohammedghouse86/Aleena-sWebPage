import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
//import { connectToDB } from './utils/database';
//import User from './app/models/user';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import {authConfig} from './auth.config';
const {GetuserLogin} = require('../src/app/actions/index')
export const {
  handlers: { GET, POST }, //will not work for anything except for ~*~*~npm install next-auth@beta~*~*~
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
          //fetching the getuser API
          console.log('These are the credentials from auth.js file',credentials);
          const userdetails = await GetuserLogin(credentials.email);
          console.log('Connected to userdetails YOYOYOYOYO',userdetails);

          //console.log('User found:', user);

          const isMatch = await bcrypt.compare(credentials.password, userdetails.password);
          if (!isMatch) {
            console.error('Invalid credentials');
            return null;
          }
          console.log('Password matched');

          return {
            //id: user._id.toString(),
            //email: user.email,
            //username: user.username,
            userdetails
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
        //token.id = user.id;
        //token.username = user.username; // Add username to the token
        //token = user;
        token.id = user.userdetails.id; // Store only the user id
        token.email = user.userdetails.email; // Optional, store email if needed
        token.name = user.userdetails.name;
        token.role = user.userdetails.role;
        token.age = user.userdetails.age;
        token.uuid = user.userdetails.uuid;
      }
      return token;
    },
    async session({ session, token }) {
      //console.log("Session data:", session);
      //session.user.id = token.id;
      //session.user.username = token.username; // Add username to the session
      //session = token;
      //console.log('and',session.one);
      session.user = {
        id: token.id, 
        email: token.email, 
        name : token.name,
        role : token.role,
        age : token.age,
        uuid : token.uuid,
        // You can add other small fields here if necessary, but not the photo
      };
      return session;
    },
  },
});
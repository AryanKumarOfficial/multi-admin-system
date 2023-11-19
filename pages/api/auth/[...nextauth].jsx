import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredenitalProvider from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email";
import User from "@/backend/Database/model/User";
import { randomUUID, randomBytes } from "crypto";
const bcrypt = require("bcryptjs");
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/backend/Utilities/adapters/mongodb-adapter";
import { connectToDB } from "@/backend/Database/middleware/connectdb";
import { log } from "console";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          access_type: "offline",
          prompt: "consent",
          include_granted_scopes: true,
        },
      },
    }),
    FacebookProvider({
      clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET,
    }),
    CredenitalProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Your Email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Your Password",
        },
      },
      authorize: async (credentials, req) => {
        // check if user exists in the database
        const userExists = await User.findOne({ email: credentials.email });
        if (userExists) {
          // check if password matches
          const combinedPassword =
            credentials.password + userExists.salt + userExists.pepper;
          const passwordMatch = await bcrypt.compareSync(
            combinedPassword,
            userExists.password
          );
          if (passwordMatch) {
            // if password matches, return user object
            console.log(userExists, "userExists");
            return Promise.resolve(userExists);
          } else {
            // if password does not match, return null
            return Promise.resolve(null);
          }
        } else {
          // if user does not exist, return null
          return Promise.resolve(null);
        }
      },
    }),
    // EmailProvider({
    //   server: {
    //     host: process.env.NEXT_PUBLIC_SMTP_HOST || "smtp.gmail.com",
    //     port: process.env.NEXT_PUBLIC_SMTP_PORT || 587,
    //     auth: {
    //       user: process.env.NEXT_PUBLIC_SMTP_USER || "aryanak9163@gmail.com",
    //       pass: process.env.NEXT_PUBLIC_SMTP_PASS || "aniwqqiigmzshvzv",
    //     },
    //   },
    //   from: process.env.NEXT_PUBLIC_SMTP_FROM,
    // }),
  ],
  pages: {
    signIn: "/client/login",
    signOut: "/",
    error: "/client/login",
    verifyRequest: "/client/login",
    newUser: "/welcome",
  },

  theme: {
    colorScheme: "dark",
    logo: "/avtar.png",
    brandColor: "#000000",
    primaryColor: "#000000",
    secondaryColor: "#000000",
    textColor: "#000000",
    fontSize: "16px",
    fontFamily: "Inter",

    // logo: "https://example.com/logo.svg",
  },

  session: {
    maxAge: 30 * 24 * 60 * 60,
    strategy: "jwt",
    updateAge: 24 * 60 * 60,
  },

  // NEXTAUTH_URL: "http://localhost:3000",

  jwt: {
    secret: process.env.NEXT_PUBLIC_JWT_SECRET,
  },
  // adapter: MongoDBAdapter(clientPromise),
  debug: true,
  callbacks: {
    session: async ({ session, token }) => {
      // if (session?.user) {
      //   session.user.id = token.uid;
      // }
      return session;
    },
    jwt: async ({ user, token, account }) => {
      if (user) {
        token = Object.assign(token, {
          uid: user.id,
          provider: account.provider,
        });
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);

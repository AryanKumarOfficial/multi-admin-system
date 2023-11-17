import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredenitalProvider from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email";
import User from "@/backend/model/User";
import { randomUUID, randomBytes } from "crypto";
const bcrypt = require("bcryptjs");

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
    EmailProvider({
      server: process.env.NEXT_PUBLIC_SMTP_SERVER,
      from: process.env.NEXT_PUBLIC_SMTP_FROM,
    }),
  ],
  // pages: {
  //   signIn: "/login",
  //   signOut: "/",
  //   error: "/login",
  //   verifyRequest: "/login",
  //   newUser: "/welcome",
  // },

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

    generateSessionToken: () => {
      return randomUUID() ?? randomBytes(32).toString("hex");
    },
  },

  // NEXTAUTH_URL: "http://localhost:3000",

  jwt: {
    secret: process.env.NEXT_PUBLIC_JWT_SECRET,
  },

  debug: true,
};

export default NextAuth(authOptions);

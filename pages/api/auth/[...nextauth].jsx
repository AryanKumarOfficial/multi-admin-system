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

    generateSessionToken: () => {
      return randomUUID() ?? randomBytes(32).toString("hex");
    },
  },

  // NEXTAUTH_URL: "http://localhost:3000",

  jwt: {
    secret: process.env.NEXT_PUBLIC_JWT_SECRET,
  },
  // adapter: MongoDBAdapter(clientPromise),
  debug: true,
  callbacks: {
    async session(session, user, token) {
      const newUser = await User.findOne({
        email: session?.token?.email,
      }).select({ password: 0, salt: 0, pepper: 0 });
      await User.findOneAndUpdate(
        {
          email: session?.token?.email,
        },
        {
          $set: {
            lastLogin: Date.now(),
            auth: {
              provider:
                session?.provider ||
                (session?.token?.picture &&
                  (session.token.picture.includes(
                    "avatars.githubusercontent.com"
                  )
                    ? "Github"
                    : session.token.picture.includes(
                        "lh3.googleusercontent.com"
                      )
                    ? "Google"
                    : session?.token?.picture.includes(
                        "platform-lookaside.fbsbx.com"
                      ) && "Facebook")) ||
                "Credentials",
              providerId: session?.id || null,
              accessToken: session?.token?.jti || null,
              refreshToken: session?.refreshToken,
              accessTokenExpires: new Date(session?.token?.exp * 1000) || null,
            },
          },
        }
      );
      log(session, "sessiossn");
      return { user: newUser };
    },
    // async jwt(token, user, account, profile, isNewUser) {
    //   return token;
    // },
    /*
    async signIn(user, account, profile) {
      const db = await connectToDB();
      const collection = await db.collection("users");
      const userExists = collection.findOne({
        email: user.email,
        auth: {
          provider: account.provider,
          providerId: account.id,
        },
      });
      if (userExists) {
        return true;
      } else {
        const userObject = {
          firstName: user.name.split(" ")[0],
          lastName: user.name.split(" ")[1],
          email: user.email,
          auth: {
            provider: account.provider,
            providerId: account.id,
            accessToken: account.accessToken,
            refreshToken: account.refreshToken,
            accessTokenExpires: account.accessTokenExpires,
          },
        };
        const newUser = await collection.insertOne(userObject);
        if (newUser.insertedCount === 1) {
          return true;
        } else {
          return false;
        }

        return false;
      }
    },*/
  },
};

export default NextAuth(authOptions);

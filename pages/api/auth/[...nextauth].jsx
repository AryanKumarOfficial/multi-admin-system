import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredenitalProvider from "next-auth/providers/credentials";
import User from "@/backend/Database/model/User";
import Moderator from "@/backend/Database/model/Moderator";
import Admin from "@/backend/Database/model/Admin";
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
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
        if (credentials.scope === "client") {
          try {
            await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI, {
              useNewUrlParser: true,
              useUnifiedTopology: true,
            });
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
                const data = {
                  id: userExists._id,
                  name: userExists.name ?? userExists.firstName.concat(" ", userExists.lastName),
                  email: userExists.email,
                  image: userExists.image,
                  role: userExists.role,
                };
                return Promise.resolve(data);
              } else {
                // if password does not match, return null
                return Promise.resolve(null);
              }
            } else {
              // if user does not exist, return null
              return Promise.resolve(null);
            }
          } catch (error) {
            return Promise.reject(new Error(error));
          }
        } else if (credentials.scope === "moderator") {
          try {
            await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI, {
              useNewUrlParser: true,
              useUnifiedTopology: true,
            });

            const userExists = await Moderator.findOne({
              email: credentials.email,
            });
            if (userExists) {
              // check if password matches
              const combinedPassword =
                credentials.password + userExists.salt + userExists.pepper;
              const passwordMatch = await bcrypt.compareSync(
                combinedPassword,
                userExists.password
              );
              if (passwordMatch && userExists.role === "moderator") {
                // if password matches, return user object
                const data = {
                  id: userExists._id,
                  name: userExists.name,
                  email: userExists.email,
                  image: userExists.image,
                  role: userExists.role,
                };
                return Promise.resolve(data);
              } else {
                // if password does not match, return null
                return Promise.resolve();
              }
            } else {
              // if user does not exist, return null
              return Promise.resolve();
            }
          } catch (error) {
            return Promise.reject(new Error(error));
          }

        } else if (credentials.scope === "admin") {
          try {
            await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI, {
              useNewUrlParser: true,
              useUnifiedTopology: true,
            });

            const userExists = await Admin.findOne({
              email: credentials.email,
            });
            if (userExists) {
              console.log(userExists, "userExists");
              // check if password matches
              const combinedPassword =
                credentials.password + userExists.salt + userExists.pepper;
              const passwordMatch = await bcrypt.compareSync(
                combinedPassword,
                userExists.password
              );
              if (passwordMatch && userExists.role === "admin") {
                // if password matches, return user object
                const data = {
                  id: userExists._id,
                  name: userExists.name,
                  email: userExists.email,
                  image: userExists.image,
                  role: userExists.role,
                };
                return Promise.resolve(data);
              } else {
                // if password does not match, return null
                return Promise.resolve();
              }
            } else {
              // if user does not exist, return null
              return Promise.resolve();
            }
          } catch (error) {
            return Promise.reject(new Error(error));
          }
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

      session.user = token;
      return session;
    },
    jwt: async ({ user, token, account }) => {
      if (user) {
        token = Object.assign(token, {
          uid: user.id,
          provider: account.provider,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        });
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);

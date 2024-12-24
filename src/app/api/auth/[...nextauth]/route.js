import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import jwt from "jsonwebtoken";
import User from "../../../../../Mogodb/schema/userSchema";
import connectDB from "../../../../../Component/Connect";
import bcrypt from "bcrypt";
import GoogleUser from "../../../../../Mogodb/schema/googleUserSchema";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
        };
      },
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await connectDB();

          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            throw new Error("No user found with this email.");
          }

          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isValid) {
            throw new Error("Invalid credentials.");
          }

          console.log(user.role);
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
          };
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user, account }) {
      try {
        await connectDB();

        let accessToken;

        if (account?.provider === "credentials") {
          accessToken = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.NEXTAUTH_SECRET,
            { expiresIn: "7d" }
          );
        } else if (account?.provider === "google") {
          const googleUser = await GoogleUser.findOne({ email: user.email });
          if (!googleUser) {
            const newUser = new GoogleUser({
              name: user.name,
              email: user.email,
            });
            await newUser.save();
          }
          accessToken = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.NEXTAUTH_SECRET,
            { expiresIn: "7d" }
          );
        }

        if (user) {
          token.userId = user.id;
          token.name = user.name;
          token.email = user.email;
          token.accessToken = accessToken;
        }

        return token;
      } catch (error) {
        console.error("JWT Callback Error:", error.message);
        throw new Error(error.message);
      }
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          userId: token.userId,
          name: token.name,
          email: token.email,
          accessToken: token.accessToken,
        };
      }

      return session;
    },
  },

  pages: {
    signIn: "/",
    error: "/auth/error",
  },
});

export const GET = handler;
export const POST = handler;

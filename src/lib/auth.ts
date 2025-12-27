import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions, User } from "next-auth";

// Extend the built-in types
declare module "next-auth" {
  interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    profileImage: string | undefined;
    accessToken: string;
    refreshToken: string;
  }

  interface Session {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      role: string;
      profileImage: string | undefined;
      accessToken: string;
      refreshToken: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    profileImage: string | undefined;
    accessToken: string;
    refreshToken: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and password are required");
          }

          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          const data = await res.json();

          if (!res.ok) {
            throw new Error(
              data?.message || data?.error || "Invalid credentials"
            );
          }

          if (!data?.data?.user?._id || !data?.data?.accessToken) {
            throw new Error("Invalid server response");
          }

          return {
            id: data.data.user._id,
            firstName: data.data.user?.firstName,
            lastName: data?.data?.user?.lastName,
            email: data.data.user.email,
            role: data.data.user.role,
            profileImage: data.data.user.profileImage,
            accessToken: data.data.accessToken,
            refreshToken: data.data.refreshToken,
          };
        } catch (error: unknown) {
          if (error instanceof Error) {
            throw new Error(error.message);
          }
          throw new Error("Login failed");
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.email = user.email;
        token.role = user.role;
        token.profileImage = user.profileImage;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        firstName: token.firstName as string,
        lastName: token.lastName as string,
        email: token.email as string,
        role: token.role as string,
        profileImage: token.profileImage as string | undefined,
        accessToken: token.accessToken as string,
        refreshToken: token.refreshToken as string,
      };
      return session;
    },
  },

  pages: {
    signIn: "/auth/sign-in",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

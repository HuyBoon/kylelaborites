import clientPromise from "@/libs/mongoConnect";
import bcrypt from "bcrypt";
import { User } from "@/models/User";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import type { Adapter } from "next-auth/adapters";
import { connectToDatabase } from "./connectToDatabase";


export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    adapter: MongoDBAdapter(clientPromise) as Adapter,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "test@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const email = credentials?.email;
                const password = credentials?.password;

                if (!email || !password) {
                    throw new Error("Email and password are required");
                }

                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    throw new Error("Invalid email format");
                }

                await connectToDatabase();
                const user = await User.findOne({ email });
                if (!user) {
                    throw new Error("Invalid email or password");
                }

                const passwordOk = await bcrypt.compare(password, user.password);
                if (!passwordOk) {
                    throw new Error("Invalid email or password");
                }

                return {
                    id: user._id.toString(),
                    email: user.email,
                    name: user.name,
                    admin: user.admin || false,
                    superAdmin: user.superAdmin || false
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.admin = Boolean(user.admin); // Ensure boolean type
                token.superAdmin = Boolean(user.superAdmin); // Ensure boolean type
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.id = token.id as string;
                session.user.admin = Boolean(token.admin); // Ensure boolean type
                session.user.superAdmin = Boolean(token.superAdmin); // Ensure boolean type
            }
            return session;
        },
    },

    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60,
        updateAge: 60 * 60,
    },
};

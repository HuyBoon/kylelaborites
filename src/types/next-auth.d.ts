import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";
import { AdapterUser as DefaultAdapterUser } from "next-auth/adapters";

// Extend the default User interface from next-auth
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      admin: boolean;
      superAdmin: boolean; // Thêm Super Admin
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    admin: boolean;
    superAdmin: boolean; // Thêm Super Admin
  }
}
// Extend the default AdapterUser interface from next-auth/adapters
declare module "next-auth/adapters" {
  interface AdapterUser extends DefaultAdapterUser {
    admin: boolean; // Add the admin field here
  }
}

// Extend the JWT interface to include the admin field
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    admin: boolean; // Add admin field to JWT
  }
}

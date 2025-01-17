import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import connectdb from "@/app/db/connectdb";
import User from "../../../models/User";

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    })
  ],
  secret: process.env.NEXTAUTH_SECRET, 
  debug: true,
 
});

export { handler as GET, handler as POST };

import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectdb from "@/app/db/connectdb";
import User from "../../../models/User";

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      async authorize() {
        const user = { email: "guest@example.com", image: "https://ui-avatars.com/api/?name=GU&background=random" }

        if (user) {
          return user
        } else {
          return null
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV !== "production",
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "github" || "google") {
        await connectdb();

        const currentUser = await User.findOne({ email: user.email });

        if (!currentUser) {
          // Create a new user
          const newUser = await User.create({
            email: user.email,
            username: user.email.split("@")[0],
          });
        } else {
          await User.findOneAndUpdate(
            { email: user.email },
            { updatedAt: new Date() } 
          );
        }

        return true; // Allow sign-in
      }
      return false; // Deny sign-in for unsupported providers
    },

    async session({ session }) {
      // Fetch the user's data from the database
      await connectdb();
      const dbUser = await User.findOne({ email: session.user.email });

      if (dbUser) {
        session.user.name = dbUser.username;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };

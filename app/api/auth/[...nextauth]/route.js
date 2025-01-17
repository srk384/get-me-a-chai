import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import connectdb from "@/app/db/connectdb";
import User from "../../../models/User";

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "github") {
        try {
          if (!user.email) {
            console.error("GitHub user email is missing.");
            return false; // Deny sign-in if email is missing
          }

          await connectdb();

          const currentUser = await User.findOne({ email: user.email });

          if (!currentUser) {
            // Create a new user if one doesn't exist
            await User.create({
              email: user.email,
              username: user.email.split("@")[0],
            });
          } else {
            // Update `updatedAt` field for existing users
            await User.findOneAndUpdate(
              { email: user.email },
              { updatedAt: new Date() }
            );
          }

          return true; // Allow sign-in
        } catch (error) {
          console.error("Error in signIn callback:", error);
          return false; // Deny sign-in on error
        }
      }
      return false; // Deny sign-in for unsupported providers
    },

    async session({ session }) {
      try {
        if (!session?.user?.email) {
          console.error("Session user email is missing.");
          return session;
        }

        await connectdb();

        const dbUser = await User.findOne({ email: session.user.email });

        if (dbUser) {
          session.user.name = dbUser.username;
        }
        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        return session;
      }
    },
  },
});

export { handler as GET, handler as POST };

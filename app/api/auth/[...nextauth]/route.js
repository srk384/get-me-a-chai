import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import connectdb from "@/app/db/connectdb";
import User from "../../../models/User";

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: 'Ov23liwuOb3dzzBJosSO',
      clientSecret: '88c6e7a4fa2cdb13a17070d52d92ad82cf2c9b4c',
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "github") {
        await connectdb();

        // Use `user.email` instead of `email`
        const currentUser = await User.findOne({ email: user.email });
        // console.log(`currentUser: ${currentUser}`);

        if (!currentUser) {
          // Create a new user
          const newUser = await User.create({
            email: user.email,
            username: user.email.split("@")[0],
          });
          // console.log(`New user created: ${newUser}`);
        } else {
          // Optionally update existing user fields here
          await User.findOneAndUpdate(
            { email: user.email },
            { updatedAt: new Date() } // Set updatedAt to the current time
          );
          // console.log(`User already exists: ${currentUser}`);
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

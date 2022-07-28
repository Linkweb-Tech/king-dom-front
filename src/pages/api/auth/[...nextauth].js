import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
        // The name to display on the sign in form (e.g. "Sign in with...")
        id: 'credentials',
        name: "credentials",
        async authorize(credentials, req) {
          // Add logic here to look up the user from the credentials supplied
          let user = ''
          if(req.body.email === "contact@linkweb.fr" && req.body.password === "aE5!kE@82o2x") {
            user = { id: 1, name: "Maître du monde", email: "jsmith@example.com" }
          }
    
          if (user) {
            // Any object returned will be saved in `user` property of the JWT
            return user
          } else {
            // If you return null then an error will be displayed advising the user to check their details.
            return null
    
            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          }
        },
        
        pages: {
          signIn: "/", //Need to define custom login page (if using)
        },
      })
  ],
  secret: process.env.NEXTAUTH_SECRET
})
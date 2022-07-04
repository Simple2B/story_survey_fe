import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import EmailProvider from "next-auth/providers/email";
import { IUserProvider } from "../../../redux/types/authTypes";
import { clientApi } from "../backend/userInstance";
// import { login } from "../../../redux/actions/authActions";
import { authApi } from "../backend/authApi";
// import { useActions } from "../../../redux/useActions";
import { login } from "../../../redux/actions/authActions";
import { stripeApi } from "../backend/stripeInstance";
// import TwitterProvider from "next-auth/providers/twitter";

export default NextAuth({
  // adapter: [
    
  // ],
  providers: [
    // EmailProvider({
    //   server: {
    //     host: process.env.EMAIL_SERVER_HOST,
    //     port: process.env.EMAIL_SERVER_PORT,
    //     auth: {
    //       user: process.env.EMAIL_SERVER_USER,
    //       pass: process.env.EMAIL_SERVER_PASSWORD
    //     }
    //   },
    //   from: process.env.EMAIL_FROM,
    //   async generateVerificationToken() {
    //     return "ABC123"
    //   }
    // }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // TwitterProvider({
    //   clientId: process.env.TWITTER_ID,
    //   clientSecret: process.env.TWITTER_SECRET,
    // }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
  // jwt: {
  //   signingKey: {"kty":"oct","kid":"--","alg":"HS256","k":"--"},
  //   verificationOptions: {
  //     algorithms: ["HS256"]
  //   }
  // }
  // theme: {
  //   colorScheme: "light",
  // },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const userData = {
        email: user.email,
        image: user.image,
        username: user.name,
        password: user.email.split("@")[0]
      };

      const newUser = await clientApi.createUserProvider(userData);
      console.log("createUser: newUser => " , newUser); 


      // TODO: create API call to get the token
      user.acessToken = 'FAKE-TOKEN'
      user.profile = newUser

      return true
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        
        token.acessToken = user.acessToken
        token.profile = user.profile
      }
      return token;
    },

    async session({ session, token }) {
      
      session.acessToken = token.acessToken
      session.profile = token.profile
      return session;
    },
  },
});

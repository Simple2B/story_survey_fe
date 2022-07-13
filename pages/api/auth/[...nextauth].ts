import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { clientApi } from "../backend/userInstance";
// import NodeCache from 'node-cache';

// function EmailTokenNodeCacheAdapter(client, options) {
//   return {
//     getUserByEmail: async (email) => ({ id: email, email }),

//     getUserByAccount: async ({ providerAccountId, provider }) => ({ id: providerAccountId, provider }),

//     updateUser: async (user) => user,

//     createVerificationToken: async (data) => {
//       return client.set(data.identifier, data) ? data : null
//     },

//     useVerificationToken: async ({ identifier, token }) => {
//       const data = client.get(identifier);
//       return (data?.token === token) ? client.take(identifier) : false;
//     }
//   }
// };


export default NextAuth({
  providers: [
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
  // adapter: EmailTokenNodeCacheAdapter(new NodeCache({ stdTTL: 24 * 60 * 60, checkperiod: 1 * 60 * 60 }), {}),
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

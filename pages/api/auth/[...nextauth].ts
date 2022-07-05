import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialProvider from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email";
import { IUserProvider } from "../../../redux/types/authTypes";
import { clientApi } from "../backend/userInstance";
// import { login } from "../../../redux/actions/authActions";
import { authApi } from "../backend/authApi";
// import { useActions } from "../../../redux/useActions";
import { login } from "../../../redux/actions/authActions";
import { stripeApi } from "../backend/stripeInstance";
import TwitterProvider from "next-auth/providers/twitter";

export default NextAuth({
  providers: [
    // CredentialProvider ({
    //     name: "",
    //     credentials: {
    //         email: {
    //           label: "Email", 
    //           type: "email", 
    //           placeholder: ""
    //         },
            
    //     },
    //     authorize: (credentials) => {
    //         // database look up
    //         if (credentials.email === "") {
    //             return {
    //               id: 2, 
    //               email: "",
    //             }
    //         }
    //     }
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
    // EmailProvider({
    //     server: process.env.EMAIL_SERVER,
    //     from: process.env.EMAIL_FROM, 
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
      console.log("credentials ", credentials);
      
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

// function PostgresAdapter(): import("next-auth/adapters").Adapter {
//   return {
//     async createUser(user) {
//       try {
//           const userData = {
//               email: user.email,
//               image: user.image,
//               username: user.email.split("@")[0],
//               password: user.email.split("@")[0],
//             };
      
//             const newUser = await clientApi.createUserProvider(userData);
//             console.log("createUser: newUser => " , newUser); 
//         return newUser;
//       } catch (err) {
//         console.log(err);
//         return;
//       }
//     },
//     async getUser(id) {
//       try {
//           const newUser = await clientApi.getUserByID(id);
//           console.log("createUser: newUser => " , newUser); 
//         return newUser;
//       } catch (err) {
//         console.log(err);
//         return;
//       }
//     },
//     async getUserByEmail(email) {
//       try {
//           const newUser = await clientApi.getUser(email);
//           console.log("createUser: newUser => " , newUser);
//         return newUser;
//       } catch (err) {
//         console.log(err);
//         return;
//       }
//     },
//     async getUserByAccount({ providerAccountId, provider }) {
//       try {
//       //   const sql = `
//       //     select u.* from users u join accounts a on u.id = a.user_id 
//       //     where 
//       //     a.provider_id = $1 
//       //     and 
//       //     a.provider_account_id = $2`;

//       //   const result = await client.query(sql, [provider, providerAccountId]);
//         return ;
//       } catch (err) {
//         console.log(err);
//       }
//     },
//     async updateUser(user) {
//       try {
//       } catch (err) {
//         console.log(err);
//         return;
//       }
//     },
//     async linkAccount(account) {
//       try {
//         const sql = `
//         insert into accounts 
//         (
//           user_id, 
//           provider_id, 
//           provider_type, 
//           provider_account_id, 
//           access_token,
//           access_token_expires
//         )
//         values ($1, $2, $3, $4, $5, to_timestamp($6))`;

//         const params = [
//           account.userId,
//           account.provider,
//           account.type,
//           account.providerAccountId,
//           account.access_token,
//           account.expires_at,
//         ];

//       //   await client.query(sql, params);
//         return account;
//       } catch (err) {
//         console.log(err);
//         return;
//       }
//     },
//     async createSession({ sessionToken, userId, expires }) {
//       try {
//       //   const sql = `insert into sessions (user_id, expires, session_token) values ($1, $2, $3)`;
//       //   await client.query(sql, [userId, expires, sessionToken]);
//       //   return { sessionToken, userId, expires };
//       } catch (err) {
//         console.log(err);
//         return;
//       }
//     },
//     async getSessionAndUser(sessionToken) {
//       try {
//       //   let result;
//       //   result = await client.query("select * from sessions where session_token = $1", [sessionToken]);

//       //   let session = result.rows[0];

//       //   result = await client.query("select * from users where id = $1", [session.user_id]);
//       //   let user = result.rows[0];

//         return {
//           session,
//           user,
//         };
//       } catch (err) {
//         console.log(err);
//         return;
//       }
//     },
//     async updateSession({ sessionToken }) {
//       console.log("updateSession", sessionToken);
//       return;
//     },
//     async deleteSession(sessionToken) {
//       try {
//       //   const sql = `delete from sessions where session_token = $1`;
//       //   await client.query(sql, [sessionToken]);
//       } catch (err) {
//         console.log(err);
//         return;
//       }
//     },
//   };
// }


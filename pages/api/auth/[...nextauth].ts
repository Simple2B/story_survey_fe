import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { clientApi } from "../backend/userInstance";
import { stripeApi } from "../backend/stripeInstance";
import Stripe from "stripe";


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
            // save user data to db
            const userData = {
                email: user.email,
                image: user.image,
                username: user.name,
                password: user.email.split("@")[0]
            };
            const newUser = await clientApi.createUserProvider(userData);
            console.log("createUser: newUser => " , newUser); 

            // create customer in stripe
            let stripeCustomer;
            if (newUser.subscription_info === null) {
                const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {apiVersion: '2020-08-27'});
                const customer = await stripe.customers.create({
                    description: user.name,
                    email: user.email,
                });
                // formed data from stripe customer to save to db
                const data = {
                    email: user.email,
                    stripe_customer: customer.id,
                };
                stripeCustomer = await stripeApi.createStripeCustomer(data);
                console.log("createUser: stripeCustomer => " , stripeCustomer);
            };

            // TODO: create API call to get the token
            user.acessToken = 'FAKE-TOKEN'
            user.profile = newUser
            // user.subscription = stripeCustomer
            return true
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            if (user) {
                token.acessToken = user.acessToken
                token.profile = user.profile
                token.subscription = user.subscription
            }
            return token;
        },
        async session({ session, token }) {
            session.acessToken = token.acessToken
            session.profile = token.profile
            session.subscription = token.subscription
            return session;
        },
    },
})

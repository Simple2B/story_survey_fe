import Stripe from "stripe";
import { instance } from "./axiosInstance";

export const stripeApi = {

      createStripeCustomer: async (data: {
        email: string, 
        stripe_customer: string,
      }): Promise<any> => {
        
          console.log("=>>> createStripeCustomer =>", data);
          try {
            const response = await instance().post(
              "/stripe/create_customer",
              data
            );
            const res = response.data;
            return res;
          } catch (error: any) {
            // place to handle errors and rise custom errors
            console.log(`POST: error message => ${error.message}`);
            // console.log("error.response.data) => ", error.response.data);
            throw new Error(error.message);
          }
      },

      createSessionStripe: async (data: {
        email: string,
        basic_product_key?: string,
        advance_product_key?: string,
        stripe_customer: string,
        stripe_session_id: string,
        subscription_id?: string | Stripe.Subscription
      }): Promise<any> => {
        
          console.log("createSessionStripe =>", data);
          try {
            const response = await instance().post(
              "/stripe/create_stripe_session",
              data
            );
            const res = response.data;
            return res;
          } catch (error: any) {
            // place to handle errors and rise custom errors
            console.log(`POST: error message => ${error.message}`);
            // console.log("error.response.data) => ", error.response.data);
            throw new Error(error.message);
          }
      },

      // create_subscription

      createSubscriptionStripe: async (data: {
        email?: string,
        stripe_customer: string,
        subscription_id: string
      }): Promise<any> => {
        
          console.log("createSubscriptionStripe =>", data);
          try {
            const response = await instance().post(
              "/stripe/create_subscription",
              data
            );
            const res = response.data;
            return res;
          } catch (error: any) {
            // place to handle errors and rise custom errors
            console.log(`POST: error message => ${error.message}`);
            // console.log("error.response.data) => ", error.response.data);
            throw new Error(error.message);
          }
      },

      deleteSubscriptionStripe: async (data: {
        subscription_id: string
      }): Promise<any> => {
        
          console.log("deleteSubscriptionStripe =>", data);
          try {
            const response = await instance().post(
              "/stripe/delete_subscription",
              data.subscription_id
            );
            const res = response.data;
            return res;
          } catch (error: any) {
            // place to handle errors and rise custom errors
            console.log(`POST: error message => ${error.message}`);
            // console.log("error.response.data) => ", error.response.data);
            throw new Error(error.message);
          }
      },

      getKeyStripe: async (): Promise<any> => {
        try {
          const response = await instance().post("/stripe/get_key");
          const res = response.data;
          return res;
        } catch (error: any) {
          // place to handle errors and rise custom errors
          console.log(`POST: error message => ${error.message}`);
          // console.log("error.response.data) => ", error.response.data);
          throw new Error(error.message);
        }
      },

      createPortalSession: async (data: {session_id: string}): Promise<any> => {
        console.log("createPortalSession =>", data);
        try {
          const response = await instance().post(
            "/stripe/create_portal_session",
            data
          );
          const res = response.data;
          return res;
        } catch (error: any) {
          // place to handle errors and rise custom errors
          console.log(`POST: error message => ${error.message}`);
          // console.log("error.response.data) => ", error.response.data);
          throw new Error(error.message);
        }
      },
 }
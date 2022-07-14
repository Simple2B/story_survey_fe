import Stripe from "stripe";
import { IUserResponse } from "../../../redux/types/userTypes";
import { instance } from "./axiosInstance";

export const stripeApi = {
      createStripeCustomer: async (data: {email: string, stripe_customer: string}): Promise<IUserResponse> => {
          try {
              const response = await instance().post(
                "/stripe/create_customer",
                data
              );
              const res = response.data;
              return res;
          } catch (error: any) {
              console.log(`POST: error message => ${error.message}`);
              throw error;
          }
      },
      createSessionStripe: async (data: {
          email: string,
          basic_product_key?: string,
          advance_product_key?: string,
          stripe_customer?: string,
          stripe_session_id: string,
          subscription_id?: string | Stripe.Subscription
      }): Promise<any> => {
          try {
              const response = await instance().post(
                "/stripe/create_stripe_session",
                data
              );
              const res = response.data;
              return res;
          } catch (error: any) {
              console.log(`POST: error message => ${error.message}`);
              throw error;
          }
      },
      createSubscriptionStripe: async (data: {
          subscription?: {},
          email?: string,
          stripe_customer: string,
          subscription_id: string
      }): Promise<any> => {
          try {
              const response = await instance().post(
                "/stripe/create_subscription",
                data
              );
              const res = response.data;
              return res;
          } catch (error: any) {
              console.log(`POST: error message => ${error.message}`);
              throw error;
          }
      },
      updateSubscriptionStripe: async (data: {
        email?: string,
        subscription?: {},
        stripe_customer: string,
        subscription_id: string,
        status: string,
    }): Promise<any> => {
        try {
            const response = await instance().put(
              "/stripe/update_subscription",
              data
            );
            const res = response.data;
            return res;
        } catch (error: any) {
            console.log(`POST: error message => ${error.message}`);
            throw error;
        }
    },
      deleteSubscriptionStripe: async (data: {subscription_id: string}): Promise<any> => {
          try {
              const response = await instance().post(
                "/stripe/delete_subscription",
                data.subscription_id
              );
              const res = response.data;
              return res;
          } catch (error: any) {
              console.log(`POST: error message => ${error.message}`);
              throw error;
          }
      },
      getKeyStripe: async (): Promise<any> => {
        try {
            const response = await instance().post("/stripe/get_key");
            const res = response.data;
            return res;
        } catch (error: any) {
            console.log(`POST: error message => ${error.message}`);
            throw error;
        }
      },
      createPortalSession: async (data: {session_id: string}): Promise<any> => {
        try {
            const response = await instance().post(
              "/stripe/create_portal_session",
              data
            );
            const res = response.data;
            return res;
        } catch (error: any) {
            console.log(`POST: error message => ${error.message}`);
            throw new Error(error.message);
        }
      },
}

import { instance } from "./axiosInstance";

export const stripeApi = {
    createSessionStripe: async (data: {email: string, key: string}): Promise<any> => {
        console.log("createSessionStripe =>", data);
        try {
          const response = await instance().post(
            "/stripe/session",
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
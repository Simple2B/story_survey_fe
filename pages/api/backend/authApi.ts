// import { AxiosError, AxiosResponse } from "axios";
// import { ILoginResponse } from "../../redux/types/authTypes";
import { authInstance } from "./axiosInstance";

const formatRequestBody = (email: string, password: string) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);
  return formData;
};

const formatRequestBodyApiKey = (password: string, api_key: string) => {
  const params = {
    password: password,
    api_key: api_key,
  };
  return params;
};

export const authApi = {
  login: async (
    email: string,
    password: string
  ): Promise<any> => {
    try {
      const response = await authInstance.post(
        "/api/auth/sign_in",
        formatRequestBody(email, password)
      );
      console.log("POST [/auth/sign_in] response received successfully");
      return response.data;
    } catch (error: any) {
      // place to handle errors and rise custom errors
      // console.log(`POST [api/auth/sign_in] error message: ${error.message}`);
      throw new Error(error.message);
    }
  },

  setPassword: async (password: string, api_key: string): Promise<void> => {
    try {
      const response = await authInstance.post(
        "api/auth/sign_up",
        formatRequestBodyApiKey(password, api_key)
      );
      console.log(
        `POST [api/sing_up/${api_key}] response received successfully`
      );
      return response.data;
    } catch (error: any) {
      // place to handle errors and rise custom errors
      console.log(
        `POST [api/sing_up/${api_key}] error message: ${error.message}`
      );
      throw new Error(error.message);
    }
  },
};

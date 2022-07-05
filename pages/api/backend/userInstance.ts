import { IUserProvider } from "../../../redux/types/authTypes";
import {  IUserResponse } from "../../../redux/types/userTypes";
import { instance } from "./axiosInstance";

export const clientApi = {
    createUserProvider: async (data: IUserProvider): Promise<IUserResponse> => {
      console.log("dataReqPatient =>", data);
      try {
        const response = await instance().post(
          "/user/create_user",
          data
        );
        console.log(`!!!!! response registration `, response);
  
        const res = response.data;
        console.log(`response received successfully `, res);
        return res;
      } catch (error: any) {
        // place to handle errors and rise custom errors
        console.log(`POST: error message => ${error.message}`);
        // console.log("error.response.data) => ", error.response.data);
        throw new Error(error.message);
      }
    },

    getUser: async (email: string): Promise<IUserResponse> => {
      console.log("getUser =>", email);
      try {
        const response = await instance().get(`/user/email/${email}`);
        const res = response.data;
        return res;
      } catch (error: any) {
        // place to handle errors and rise custom errors
        console.log(`POST: error message => ${error.message}`);
        // console.log("error.response.data) => ", error.response.data);
        throw new Error(error.message);
      }
    },

    getUserByID: async (id: number): Promise<IUserResponse> => {
      console.log("getUserByID =>", id);
      try {
        const response = await instance().get(`/user/id/${id}`);
        const res = response.data;
        return res;
      } catch (error: any) {
        // place to handle errors and rise custom errors
        console.log(`POST: error message => ${error.message}`);
        // console.log("error.response.data) => ", error.response.data);
        throw new Error(error.message);
      }
    },

    getUsers: async (): Promise<IUserResponse[]> => {
      // console.log("getUser =>", email);
      try {
        const response = await instance().get('/user/get_users');
        console.log("getUsers response =>", response);
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

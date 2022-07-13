import { IUserProvider } from "../../../redux/types/authTypes";
import {  IUserResponse } from "../../../redux/types/userTypes";
import { instance } from "./axiosInstance";

export const clientApi = {
    createUserProvider: async (data: IUserProvider): Promise<IUserResponse> => {
      try {
          const response = await instance().post(
            "/user/create_user",
            data
          );
          const res = response.data;
          return res;
      } catch (error: any) {
          console.log(`POST: error message => ${error.message}`);
          throw error;
      }
    },
    getUser: async (email: string): Promise<IUserResponse> => {
      try {
          const response = await instance().get(`/user/email/${email}`);
          const res = response.data;
          return res;
      } catch (error: any) {
          console.log(`POST: error message => ${error.message}`);
          throw error;
      }
    },
    getUserByID: async (id: number): Promise<IUserResponse> => {
      try {
          const response = await instance().get(`/user/id/${id}`);
          const res = response.data;
          return res;
      } catch (error: any) {
          console.log(`POST: error message => ${error.message}`);
          throw error;
      }
    },
    getUsers: async (): Promise<IUserResponse[]> => {
      try {
          const response = await instance().get('/user/get_users');
          const res = response.data;
          return res;
      } catch (error: any) {
          console.log(`POST: error message => ${error.message}`);
          throw error;
      }
    },
}

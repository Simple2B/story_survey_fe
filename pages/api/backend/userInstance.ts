import { IUserProvider, IUserResponse } from "../../../redux/types/userTypes";
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
}

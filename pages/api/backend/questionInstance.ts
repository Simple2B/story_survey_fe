import { instance } from "./axiosInstance";

export const questionApi = {

    deleteQuestion: async (id: number): Promise<void> => {
      try {
        const response = await instance().delete(`/question/${id}`);
        console.log(`deleteQuestion: response `, response);
  
        const res = response.data;
        console.log(`deleteQuestion: response received successfully `, res);
        return res;
      } catch (error: any) {
        // place to handle errors and rise custom errors
        console.log(`POST: deleteQuestion error message => ${error.message}`);
        // console.log("error.response.data) => ", error.response.data);
        throw new Error(error.message);
      }
    },

}

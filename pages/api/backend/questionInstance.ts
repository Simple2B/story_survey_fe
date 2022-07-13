import { instance } from "./axiosInstance";

export const questionApi = {
    deleteQuestion: async (id: number): Promise<void> => {
      try {
          const response = await instance().delete(`/question/${id}`);
          const res = response.data;
          return res;
      } catch (error: any) {
          console.log(`POST: deleteQuestion error message => ${error.message}`);
          throw error;
      }
    },
}

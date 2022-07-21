import { ICreateSurvey, IGetSurvey } from "../../../redux/types/surveyTypes";
import { instance } from "./axiosInstance";

export const surveyApi = {
    createSurvey: async (data: ICreateSurvey): Promise<any> => {
      try {
          const response = await instance().post(
            "/survey/create_survey",
            data
          );
          const res = response.data;
          return res;
      } catch (error: any) {
          console.log(`POST: error message => ${error.message}`);
          throw error;
      }
    },
    getUserSurveys: async (email: string): Promise<IGetSurvey[]> => {
      try {
          const response = await instance().get(`/survey/${email}`);
          const res = response.data;
          return res;
      } catch (error: any) {
          console.log(`POST: getUserSurveys error message => ${error.message}`);
          throw error;
      }
    },
    getSurveys: async (): Promise<IGetSurvey[]> => {
      // try {
          const response = await instance().get('/survey/surveys');
          const res = response.data;
          return res;
      // } catch (error: any) {
      //     console.log(`POST: getSurveys error message => ${error.message}`);
      //     throw error;
      // }
    },
    deleteSurvey: async (data: {email: string, survey_id: number}): Promise<void> => {
      try {
          const response = await instance().post('/survey/delete_survey', data);
          const res = response.data;
          return res;
      } catch (error: any) {
          console.log(`POST: deleteSurvey error message => ${error.message}`);
          throw error;
      }
    },
    answerTheQuestion: async (data:{
          answer: string, 
          is_answer: boolean,
          question: {question: string, id: number, survey_id: number}, 
          email: string,
          session_id: string,
          start_time?: string,
          end_time?: string,
    }[]): Promise<any> => {
      console.log("answerTheQuestion: data => ", data);
      try {
          const response = await instance().post('/answer/create_answer', data);
          const res = response.data;
          return res;
      } catch (error: any) {
        console.log(`POST: answerTheQuestion error message => ${error.message}`);
        throw error;
      }
    },
    editSurvey: async (data: IGetSurvey, id: number): Promise<any> => {
      try {
          const response = await instance().put(
            `/survey/update/${id}`,
            data
          );
          const res = response.data;
          return res;
      } catch (error: any) {
          console.log(`POST: editSurvey -> error message => ${error.message}`);
          throw new Error(error.message);
      }
    },
    getSurveyFromDB: async (id: string): Promise<any> => {
      try {
          const response = await instance().get(`/survey/get_survey/${id}`);
          const res = response.data;
          return res;
      } catch (error: any) {
          console.log(`POST: getSurveyFromDB -> error message => ${error.message}`);
          throw new Error(error.message);
      }
    },
    getSurveyFromDBWithUUID: async (uuid: string): Promise<any> => {
      try {
          const response = await instance().get(`/survey/get_survey_with_uuid/${uuid}`);
          const res = response.data;
          return res;
      } catch (error: any) {
          console.log(`POST: getSurveyFromDBWithUUID -> error message => ${error.message}`);
          throw error;
      }
    },
    getInfoSurvey: async (id: number): Promise<any> => {
      try {
          const response = await instance().get(`/survey/get_survey/survey_with_answer/${id}`);
          const res = response.data;
          return res;
      } catch (error: any) {
          console.log(`POST: getInfoSurvey -> error message => ${error.message}`);
          throw error;
      }
    },
    getFileSurvey: async (uuid: string): Promise<any> => {
      try {
          const response = await instance().get(`/survey/report_survey/${uuid}`);
          const res = response.data;
          return res;
      } catch (error: any) {
          console.log(`POST: getFileSurvey -> error message => ${error.message}`);
          throw error;
      }
    },
}

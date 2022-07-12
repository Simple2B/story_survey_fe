import { ICreateSurvey, IGetSurvey } from "../../../redux/types/surveyTypes";
import { instance } from "./axiosInstance";

export const surveyApi = {
    createSurvey: async (data: ICreateSurvey): Promise<any> => {
      console.log("createSurvey =>", data);
      try {
        const response = await instance().post(
          "/survey/create_survey",
          data
        );
        console.log(`createSurvey: response `, response);
  
        const res = response.data;
        console.log(`createSurvey: response received successfully `, res);
        return res;
      } catch (error: any) {
        // place to handle errors and rise custom errors
        console.log(`POST: error message => ${error.message}`);
        // console.log("error.response.data) => ", error.response.data);
        throw new Error(error.message);
      }
    },

    getUserSurveys: async (email: string): Promise<IGetSurvey[]> => {
      try {
        const response = await instance().get(`/survey/${email}`);
        console.log(`getUserSurveys: response `, response);
  
        const res = response.data;
        console.log(`getUserSurveys: response received successfully `, res);
        return res;
      } catch (error: any) {
        // place to handle errors and rise custom errors
        console.log(`POST: getUserSurveys error message => ${error.message}`);
        // console.log("error.response.data) => ", error.response.data);
        throw new Error(error.message);
      }
    },

    getSurveys: async (): Promise<IGetSurvey[]> => {
      try {
        const response = await instance().get('/survey/surveys');
        console.log(`getSurveys: response `, response);
  
        const res = response.data;
        console.log(`getSurveys: response received successfully `, res);
        return res;
      } catch (error: any) {
        // place to handle errors and rise custom errors
        console.log(`POST: getSurveys error message => ${error.message}`);
        // console.log("error.response.data) => ", error.response.data);
        throw new Error(error.message);
      }
    },

    deleteSurvey: async (data: {email: string, survey_id: number}): Promise<void> => {
      try {
        const response = await instance().post('/survey/delete_survey', data);
        console.log(`deleteSurvey: response `, response);
  
        const res = response.data;
        console.log(`deleteSurvey: response received successfully `, res);
        return res;
      } catch (error: any) {
        // place to handle errors and rise custom errors
        console.log(`POST: deleteSurvey error message => ${error.message}`);
        // console.log("error.response.data) => ", error.response.data);
        throw new Error(error.message);
      }
    },

    answerTheQuestion: async (data:{
        answer: string, 
        question: {question: string, id: number, survey_id: number}, 
        email: string,
        session_id: string,
        start_time?: string,
        end_time?: string,
      }[]): Promise<void> => {
      try {
        const response = await instance().post('/answer/create_answer', data);
        console.log(`answerTheQuestion: response `, response);
  
        const res = response.data;
        console.log(`answerTheQuestion: response received successfully `, res);
        return res;
      } catch (error: any) {
        // place to handle errors and rise custom errors
        console.log(`POST: answerTheQuestion error message => ${error.message}`);
        // console.log("error.response.data) => ", error.response.data);
        throw new Error(error.message);
      }
    },

    editSurvey: async (data: IGetSurvey, id: number): Promise<any> => {
      console.log("editSurvey =>", data);
      try {
        const response = await instance().put(
          `/survey/update/${id}`,
          data
        );
        console.log(`editSurvey: response `, response);
  
        const res = response.data;
        console.log(`editSurvey: response received successfully `, res);
        return res;
      } catch (error: any) {
        // place to handle errors and rise custom errors
        console.log(`POST: error message => ${error.message}`);
        // console.log("error.response.data) => ", error.response.data);
        throw new Error(error.message);
      }
    },

    getSurveyFromDB: async (id: string): Promise<any> => {
      try {
        const response = await instance().get(`/survey/get_survey/${id}`);
        console.log(`getSurveyFromDB: response `, response);
  
        const res = response.data;
        console.log(`getSurveyFromDB: response received successfully `, res);
        return res;
      } catch (error: any) {
        // place to handle errors and rise custom errors
        console.log(`POST: error message => ${error.message}`);
        // console.log("error.response.data) => ", error.response.data);
        throw new Error(error.message);
      }
    },

    getSurveyFromDBWithUUID: async (uuid: string): Promise<any> => {
      try {
        const response = await instance().get(`/survey/get_not_public_survey/${uuid}`);
        console.log(`getSurveyFromDBWithUUID: response `, response);
  
        const res = response.data;
        console.log(`getSurveyFromDBWithUUID: response received successfully `, res);
        return res;
      } catch (error: any) {
        // place to handle errors and rise custom errors
        console.log(`POST: error message => ${error.message}`);
        // console.log("error.response.data) => ", error.response.data);
        throw new Error(error.message);
      }
    },

    getInfoSurvey: async (id: number): Promise<any> => {
      try {
        const response = await instance().get(`/survey/get_survey/survey_with_answer/${id}`);
        const res = response.data;
        console.log(`getInfoSurvey: response received successfully `, res);
        return res;
      } catch (error: any) {
        console.log(`POST: error message => ${error.message}`);
        throw new Error(error.message);
      }
    },
}

import { IGetSurvey } from "./surveyTypes";

export const CLIENT = 'Client';
export const ADMIN = 'Admin';


export enum UserActionTypes {
  SET_CURRENT_USER = "SET_CURRENT_USER",
  GET_CURRENT_USER = "GET_CURRENT_USER",
}

interface ISetUserAction {
  type: UserActionTypes.SET_CURRENT_USER;
}
// interface ILoginRequestSuccessAction {
//   type: AuthActionTypes.LOGIN_SUCCESS;
//   payload: ILoginResponse;
// }
// interface ILoginRequestFailureAction {
//   type: AuthActionTypes.LOGIN_FAILURE;
//   payload: string;
// }


interface IGetUserAction {
  type: UserActionTypes.GET_CURRENT_USER;
  payload: IUserResponse;
}

export type UserAction = ISetUserAction | IGetUserAction;

// object types
export interface IUserResponse {
  id?: number;
  created_at?: string;
  email?: string;
  image?: string;
  role?: string;
  username?: string;
  surveys?: IGetSurvey[]
}

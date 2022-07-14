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
    uuid?: string;
    username?: string;
    email?: string;
    created_at?: string;
    role?: string;
    image?: string;
    customer_id?: string;
    session_id?: string;
    subscription?: string;
    cancel_at_period_end?: string;
    subscription_id?: string;
    product_id?: string;
    surveys?: IGetSurvey[]
}

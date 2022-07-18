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

export interface IUserSubscriptionInfo {
    type?: string;
    customer_id?: string;
    session_id?: string;
    subscription?: string;
    cancel_at?: string;
    cancel_at_period_end?: boolean;
    subscription_id?: string;
    product_id?: string;
}

// object types
export interface IUserResponse {
    id?: number;
    uuid?: string;
    username?: string;
    email?: string;
    created_at?: string;
    role?: string;
    image?: string;

    subscription_info?: IUserSubscriptionInfo;
    surveys?: IGetSurvey[]
}

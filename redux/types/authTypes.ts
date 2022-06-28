// state
export interface IAuthState {
    loggedIn: boolean;
    errorMessage: string;
    isLoading: boolean;
}
// action types
export enum AuthActionTypes {
  AUTH_API_REQUEST = "AUTH_API_REQUEST",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAILURE = "LOGIN_FAILURE",
  GET_CURRENT_USER = "GET_CURRENT_USER",
  LOGOUT = "LOGOUT",
  CHECK_TOKEN = "CHECK_TOKEN",
}

interface IAuthApiRequestAction {
  type: AuthActionTypes.AUTH_API_REQUEST;
}

interface ILoginRequestSuccessAction {
  type: AuthActionTypes.LOGIN_SUCCESS;
  payload: ILoginResponse;
}
interface ILoginRequestFailureAction {
  type: AuthActionTypes.LOGIN_FAILURE;
  payload: string;
}



interface ILogoutAction {
  type: AuthActionTypes.LOGOUT;
}
interface ICheckToken {
  type: AuthActionTypes.CHECK_TOKEN;
  payload: ILoginResponse;
}
  
export type AuthAction =
  | IAuthApiRequestAction
  | ILoginRequestSuccessAction
  | ILoginRequestFailureAction
  | ILogoutAction
  | ICheckToken;
  
// object types
export interface ILoginResponse {
  access_token: string;
  token_type: string;
}
  
export interface ILogoutResponse {
  status: string;
  detail: string;
}


export interface ILoginParams {
  username: string;
  password: string;
}

export interface IUserProvider {
  email?: string;
  image?: string;
  username?: string;
  password?: string;
}
  
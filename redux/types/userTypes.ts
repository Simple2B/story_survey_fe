// export interface IUserProvider {
//     email?: string;
//     image?: string;
//     username?: string;
//     password?: string;
// }

// state
// export interface IUserState {

// }
// action types
export enum UserActionTypes {
  CREATE_CURRENT_USER = "CREATE_CURRENT_USER",
  GET_CURRENT_USER = "GET_CURRENT_USER",
}

interface ISetUserAction {
  type: UserActionTypes.CREATE_CURRENT_USER;
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
  id: number;
  created_at: string;
  email: string;
  image: string;
  role: string;
  username: string;
}

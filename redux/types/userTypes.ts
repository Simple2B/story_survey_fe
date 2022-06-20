export interface IUserProvider {
    email?: string;
    image?: string;
    username?: string;
    password?: string;
}

// state
// export interface IUserState {

// }
// action types
export enum UserActionTypes {
  SET_CURRENT_USER = "SET_CURRENT_USER",
  GET_CURRENT_USER = "GET_CURRENT_USER",
}

interface ISetUserAction {
  type: UserActionTypes.SET_CURRENT_USER;
  payload: IUserResponse;
}

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

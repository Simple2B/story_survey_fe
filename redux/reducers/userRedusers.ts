import { AuthAction, AuthActionTypes } from "../types/authTypes";
import {IUserProvider, IUserResponse, UserAction, UserActionTypes } from "../types/userTypes";

const initialState = {
  id: null,
  created_at: "",
  email: "",
  image: "",
  role: "",
  username: "",
  password: "",
}

export const userReducer = (
  state = initialState,  
  action: AuthAction,
): IUserResponse => {
  switch (action.type) {
    case AuthActionTypes.CREATE_CURRENT_USER:
      return state;
    case AuthActionTypes.GET_CURRENT_USER:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state;
  }
};

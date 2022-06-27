import { AuthActionTypes } from "../types/authTypes";
import {IUserResponse, UserAction, UserActionTypes } from "../types/userTypes";

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
  action: UserAction,
): IUserResponse => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return state;
    case UserActionTypes.GET_CURRENT_USER:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state;
  }
};

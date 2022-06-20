import {IUserResponse, UserAction, UserActionTypes } from "../types/userTypes";


export const userReducer = (
  state = {},  
  action: UserAction,
): IUserResponse => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...action.payload,
      };
    default:
      return null;
  }
};

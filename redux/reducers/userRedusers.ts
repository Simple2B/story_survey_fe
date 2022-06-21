import {IUserProvider, IUserResponse, UserAction, UserActionTypes } from "../types/userTypes";

const initialState = {
  // id: null,
  // created_at: "",
  email: "",
  image: "",
  // role: "",
  username: "",
  password: "",
}

export const userReducer = (
  state = initialState,  
  action: UserAction,
): IUserProvider => {
  switch (action.type) {
  //   case UserActionTypes.SET_CURRENT_USER:
  //     return {
  //       ...action.payload,
  //     };
    default:
      return state;
  }
};

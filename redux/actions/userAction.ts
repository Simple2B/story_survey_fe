
import { Dispatch } from "redux";
import { IUserResponse, UserAction, UserActionTypes } from "../types/userTypes";

  
  export const setCurrentUser = (user: IUserResponse) => {
    return async (dispatch: Dispatch<UserAction>): Promise<any> => {
      try {

        dispatch({
            type: UserActionTypes.SET_CURRENT_USER,
            payload: user
        });

        dispatch({
          type: UserActionTypes.GET_CURRENT_USER,
          payload: user
      });

        return user;

      } catch (e: any) {
        console.log("setCurrentUser: error from redux -> ", e);
        // dispatch({
        //   type: UserActionTypes.SET_CURRENT_USER,
        //   payload: "setCurrentUser: Invalid login credentials. Please try again!",
        // });
      }
    };
  };
 
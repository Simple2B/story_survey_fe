
import { Dispatch } from "redux";
import { clientApi } from "../../pages/api/backend/userInstance";
import { IUserProvider, IUserResponse, UserAction, UserActionTypes } from "../types/userTypes";

  
  export const setCurrentUser = (user: IUserProvider) => {
    return async (dispatch: Dispatch<UserAction>): Promise<any> => {
      try {
        const dataUser: IUserResponse = await clientApi.createUserProvider(user);

        console.log("getInfo dataUser => ", dataUser);

        dispatch({
            type: UserActionTypes.SET_CURRENT_USER,
            payload: dataUser
        });

      } catch (e: any) {
        console.log("setCurrentUser: error from redux -> ", e);
        // dispatch({
        //   type: UserActionTypes.SET_CURRENT_USER,
        //   payload: "setCurrentUser: Invalid login credentials. Please try again!",
        // });
      }
    };
  };
 
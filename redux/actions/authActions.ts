import {
    ILoginParams,
    AuthAction,
    AuthActionTypes,
    ILoginResponse,
    ILogoutResponse,
    IUserResponse,
    IUserProvider,
  } from "../types/authTypes";
  import { Dispatch } from "redux";
import { authApi } from "../../pages/api/backend/authApi";
import { clientApi } from "../../pages/api/backend/userInstance";
  
export const createUser = (data: IUserProvider) => {
  return async (dispatch: Dispatch<AuthAction>): Promise<any> => {
    try {
      dispatch({ type: AuthActionTypes.CREATE_CURRENT_USER });

      const userData: IUserResponse = await clientApi.createUserProvider(data);

      dispatch({ type: AuthActionTypes.GET_CURRENT_USER, payload:  userData});

      return {username: userData.username, email: userData.email}
    } catch (e: any) {
      console.log("createUser: error from redux -> ", e);
      // dispatch({
      //   type: AuthActionTypes.LOGIN_FAILURE,
      //   payload: "Invalid credentials. Please try again!",
      // });
      // return e.message;
    }
  };
};

  
export const login = ({ password, username }: ILoginParams) => {
  return async (dispatch: Dispatch<AuthAction>): Promise<any> => {
    try {
      dispatch({ type: AuthActionTypes.AUTH_API_REQUEST });
      const data: ILoginResponse = await authApi.login(username, password);

      localStorage.setItem("token", data.access_token);
      // const now = new Date();
      // localStorage['dateNow'] = ''+now.getTime();

      dispatch({
        type: AuthActionTypes.LOGIN_SUCCESS,
        payload: data,
      });
      return data.access_token;
    } catch (e: any) {
      console.log("authAction: error from redux -> ", e);
      dispatch({
        type: AuthActionTypes.LOGIN_FAILURE,
        payload: "Invalid login credentials. Please try again!",
      });
      // return e.message;
    }
  };
};
  
  // TODO: implement logout action api
  export const logout = () => {
    return async (dispatch: Dispatch<AuthAction>) => {
      try {
        // const data: ILogoutResponse = await authApi.logout();
        localStorage.removeItem("token");
  
        dispatch({ type: AuthActionTypes.LOGOUT });
      } catch (e: any) {
        dispatch({ type: AuthActionTypes.LOGIN_FAILURE, payload: e });
      }
    };
  };
  
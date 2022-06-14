import {
    ILoginParams,
    AuthAction,
    AuthActionTypes,
    ILoginResponse,
    ILogoutResponse,
  } from "../types/authTypes";
  import { Dispatch } from "redux";
  import { authApi } from "../../pages/api/authApi";
  
  export const login = ({ password, email }: ILoginParams) => {
    return async (dispatch: Dispatch<AuthAction>): Promise<any> => {
      try {
        dispatch({ type: AuthActionTypes.AUTH_API_REQUEST });
        const data: ILoginResponse = await authApi.login(email, password);

        if (typeof window !== 'undefined') {
          console.log('You are on the browser')
          localStorage.setItem("token", data.access_token);
          const now = new Date();
          localStorage['dateNow'] = ''+now.getTime();
        } else {
          console.log('You are on the server')
        }
        
        
  
        dispatch({
          type: AuthActionTypes.LOGIN_SUCCESS,
          payload: data,
        });
        // return data.access_token;
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
        if (typeof window !== 'undefined') {
          console.log('You are on the browser')
          localStorage.removeItem("token");
        } else {
          console.log('You are on the server')
        }
        
        
  
        dispatch({ type: AuthActionTypes.LOGOUT });
      } catch (e: any) {
        dispatch({ type: AuthActionTypes.LOGIN_FAILURE, payload: e });
      }
    };
  };
  
import { AuthAction, AuthActionTypes, IAuthState } from "../types/authTypes";

let initialState: IAuthState = (function () {
  let tokenInfo;
  if (typeof window !== 'undefined') {
    console.log('You are on the browser')
    tokenInfo = localStorage.getItem("token");
  } else {
    console.log('You are on the server')
  }
  
  if (tokenInfo) {
    return {
      loggedIn: true,
      errorMessage: "",
      isLoading: false,
    };
  } else
    return {
      loggedIn: false,
      errorMessage: "",
      isLoading: false,
    };
})();

export const authReducer = (
  state = initialState,
  action: AuthAction
): IAuthState => {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        errorMessage: "",
      };
    case AuthActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        loggedIn: false,
        errorMessage: action.payload,
        isLoading: true,
      };
    case AuthActionTypes.LOGOUT:
      return { ...state, loggedIn: false, errorMessage: "" };
    case AuthActionTypes.CHECK_TOKEN:
      return { ...state, loggedIn: true };
    default:
      return state;
  }
};

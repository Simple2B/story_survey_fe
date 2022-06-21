import { combineReducers } from "redux";
import { authReducer } from "./authRedusers";
import { userReducer } from "./userRedusers";


export const rootReducer = combineReducers({
//   app: commonReducer,
  auth: authReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

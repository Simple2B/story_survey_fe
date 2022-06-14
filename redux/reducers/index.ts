import { combineReducers } from "redux";
import { authReducer } from "./authRedusers";


export const rootReducer = combineReducers({
//   app: commonReducer,
  auth: authReducer,

});

export type RootState = ReturnType<typeof rootReducer>;

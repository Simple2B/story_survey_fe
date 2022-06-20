import * as AuthActionCreators from "./authActions";
import * as UserActionCreators from "./userAction";

export const actionsCreator = {
  ...AuthActionCreators,
  ...UserActionCreators,
};

import * as ActionType from "./ActionTypes";

export const Campsites = (
  state = { isLoading: true, errMess: null, campsites: [] },
  action
) => {
  switch (action.type) {
    case ActionType.ADD_CAMPSITES:
      console.log("pew pew");
      return {
        ...state,
        isLoading: false,
        errMess: null,
        campsites: action.payload,
      };
    case ActionType.CAMPSITES_LOADING:
      return { ...state, isLoading: true, errMess: null, campsites: [] };
    case ActionType.CAMPSITES_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };
    default:
      return state;
  }
};

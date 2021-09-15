import { CLEAR_MESSAGE, SET_MESSAGE } from "redux/constants";


export const setMessage = (message, isDisplay) => ({
  type: SET_MESSAGE,
  payload: message,
  isDisplay
});

export const clearMessage = () => ({
  type: CLEAR_MESSAGE,
});

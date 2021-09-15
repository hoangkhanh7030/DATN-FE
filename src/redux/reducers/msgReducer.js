import { SET_MESSAGE, CLEAR_MESSAGE } from "redux/constants";

const initialState = {};

export default function reducer(state = initialState, action) {
  const { type, payload, isDisplay } = action;

  switch (type) {
    case SET_MESSAGE:
      return { message: payload, isDisplay };

    case CLEAR_MESSAGE:
      return { message: "", isDisplay: false };

    default:
      return state;
  }
}

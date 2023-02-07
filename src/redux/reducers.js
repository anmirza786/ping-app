import * as actions from './actionTypes'

export const initialState = {
  error: null,
  data: null,
  loading: false
};

export function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actions.REQUEST_START:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case actions.REQUEST_DONE:
      return {
        ...state,
        loading: false,
        error: null,
        data: payload,
      };
    default:
      return state;
  }
}

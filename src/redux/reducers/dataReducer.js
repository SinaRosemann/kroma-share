import {
  SET_PROJEKTS,
  LIKE_PROJEKT,
  UNLIKE_PROJEKT,
  LOADING_DATA,
  DELETE_PROJEKT,
  POST_PROJEKT,
  SET_PROJEKT,
  SUBMIT_COMMENT
} from "../types";

const initialState = {
  projekts: [],
  projekt: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_PROJEKTS:
      return {
        ...state,
        projekts: action.payload,
        loading: false
      };
    case SET_PROJEKT:
      return {
        ...state,
        projekt: action.payload
      };
    case LIKE_PROJEKT:
    case UNLIKE_PROJEKT:
      var index = state.projekts.findIndex(
        projekt => projekt.projektsId === action.payload.projektsId
      );
      state.projekts[index] = action.payload;
      if (state.projekts.projektsId === action.payload.projektsId) {
        state.projekts = action.payload;
      }
      return {
        ...state
      };
    case DELETE_PROJEKT:
      return {
        ...state,
        projekts: state.projekts.filter(
          projekt => projekt.projektsId !== action.payload
        )
      };
    case POST_PROJEKT:
      return {
        ...state,
        projekts: [action.payload, ...state.projekts]
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        projekt: {
          ...state.projekt,
          comments: [action.payload, ...state.projekt.comments]
        }
      };
    default:
      return state;
  }
}

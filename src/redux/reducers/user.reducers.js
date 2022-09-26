import { userConstants } from "../actions/constants";

const initState = {
  userList: [],
  userDetails: {},
  error: null,
  message: "",
  loading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case userConstants.USER_REGISTER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case userConstants.USER_REGISTER_SUCCESS:
      state = {
        ...state,
        message: action.payload.message,
        loading: false,
      };
      break;
    case userConstants.USER_REGISTER_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
    case userConstants.GET_ALL_USER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case userConstants.GET_ALL_USER_SUCCESS:
      state = {
        ...state,
        userList: action.payload.users,
        loading: false,
      };
      break;
    case userConstants.GET_ALL_USER_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
    case userConstants.GET_USER_DETAILS_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case userConstants.GET_USER_DETAILS_SUCCESS:
      state = {
        ...state,
        userDetails: action.payload.user,
        loading: false,
      };
      break;
    case userConstants.GET_USER_DETAILS_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
    case userConstants.UPDATE_USER_ROLE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case userConstants.UPDATE_USER_ROLE_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case userConstants.UPDATE_USER_ROLE_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
    case userConstants.DELETE_USER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case userConstants.DELETE_USER_SUCCESS:
      state = {
        ...state,
        message: action.payload.message,
        loading: false,
      };
      break;
    case userConstants.DELETE_USER_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
  }
  return state;
};

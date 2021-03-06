import {
  CHANGE_USER_PASSWORD_FAILURE,
  CHANGE_USER_PASSWORD_REQUEST,
  CHANGE_USER_PASSWORD_SUCCESS,
  GOOGLE_LOGIN_FAILURE,
  GOOGLE_LOGIN_REQUEST,
  GOOGLE_LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  USER_LOADING_FAILURE,
  USER_LOADING_REQUEST,
  USER_LOADING_SUCCESS,
} from "../types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  user: "",
  userId: "",
  userName: "",
  userRole: "",
  errorMsg: "",
  successMsg: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_USER_PASSWORD_REQUEST:
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case GOOGLE_LOGIN_REQUEST:
    case LOGOUT_REQUEST:
      return {
        ...state,
        errorMsg: "",
        isLoading: true,
      };
    case REGISTER_SUCCESS:
    case GOOGLE_LOGIN_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);

      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
        userId: action.payload.user.id,
        userRole: action.payload.user.role,
        errorMsg: "",
      };
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case LOGOUT_FAILURE:
    case GOOGLE_LOGIN_FAILURE:
      localStorage.removeItem("token");

      console.log(action.payload.data.msg);

      return {
        ...state,
        ...action.payload,
        token: null,
        user: null,
        userId: null,
        isAuthenticated: false,
        isLoading: false,
        userRole: null,
        errorMsg: action.payload.data.msg,
      };
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");

      return {
        token: null,
        user: null,
        usesrId: null,
        isAuthenticated: false,
        isLoading: false,
        userRole: null,
        errorMsg: "",
      };

    case CHANGE_USER_PASSWORD_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
        userId: action.payload.user.id,
        userRole: action.payload.user.role,
        errorMsg: "",
      };
    case CHANGE_USER_PASSWORD_FAILURE:
      return {};

    case USER_LOADING_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADING_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
        userId: action.payload._id,
        userName: action.payload.name,
        userRole: action.payload.role,
      };
    case USER_LOADING_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        userRole: "",
      };

    default:
      return state;
  }
};

export default authReducer;

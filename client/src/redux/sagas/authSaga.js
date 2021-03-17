import axios from "axios";
import { all, call, put, takeEvery, fork } from "redux-saga/effects";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  USER_LOADING_SUCCESS,
  USER_LOADING_FAILURE,
  USER_LOADING_REQUEST,
  LOGOUT_REQUEST,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  GOOGLE_LOGIN_REQUEST,
  GOOGLE_LOGIN_FAILURE,
  GOOGLE_LOGIN_SUCCESS,
  CHANGE_USER_PASSWORD_REQUEST,
  CHANGE_USER_PASSWORD_SUCCESS,
  CHANGE_USER_PASSWORD_FAILURE,
} from "../types";

const loginUserAPI = (loginData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios.post("api/auth/login", loginData, config);
};

function* loginUser(loginaction) {
  try {
    const result = yield call(loginUserAPI, loginaction.payload);

    yield put({
      type: LOGIN_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: LOGIN_FAILURE,
      payload: e.response,
    });
  }
}

function* watchLoginUser() {
  yield takeEvery(LOGIN_REQUEST, loginUser);
}

// Google Login
const googleLoginAPI = (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios.get("api/auth/googlelogin", data, config);
};

function* googleLogin(action) {
  try {
    const result = yield call(googleLoginAPI, action.payload);

    yield put({
      type: GOOGLE_LOGIN_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: GOOGLE_LOGIN_FAILURE,
      payload: e.response,
    });
  }
}

function* watchgoogleLogin() {
  yield takeEvery(GOOGLE_LOGIN_REQUEST, googleLogin);
}

// Register
const registerUserAPI = (registerData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios.post("api/user/register", registerData, config);
};

function* registerUser(action) {
  try {
    const result = yield call(registerUserAPI, action.payload);

    yield put({
      type: REGISTER_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: REGISTER_FAILURE,
      payload: e.response,
    });
  }
}

function* watchregisterUser() {
  yield takeEvery(REGISTER_REQUEST, registerUser);
}

// User Loading
const userLoadingAPI = (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return axios.get("api/auth/user", config);
};

function* userLoading(action) {
  try {
    const result = yield call(userLoadingAPI, action.payload);

    yield put({
      type: USER_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: USER_LOADING_FAILURE,
      payload: e.response,
    });
  }
}

function* watchuserLoading() {
  yield takeEvery(USER_LOADING_REQUEST, userLoading);
}

// LOGOUT
function* logout() {
  try {
    yield put({
      type: LOGOUT_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: LOGOUT_FAILURE,
    });
  }
}

function* watchlogout() {
  yield takeEvery(LOGOUT_REQUEST, logout);
}

// Change Password
const changeUserPasswordAPI = (newData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios.post("api/user/changepassword", newData, config);
};

function* changeUserPassword(action) {
  try {
    const result = yield call(changeUserPasswordAPI, action.payload);

    yield put({
      type: CHANGE_USER_PASSWORD_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: CHANGE_USER_PASSWORD_FAILURE,
      payload: e.response,
    });
  }
}

function* watchchangeUserPassword() {
  yield takeEvery(CHANGE_USER_PASSWORD_REQUEST, changeUserPassword);
}

export default function* authSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchgoogleLogin),
    fork(watchregisterUser),
    fork(watchuserLoading),
    fork(watchlogout),
    fork(watchchangeUserPassword),
  ]);
}

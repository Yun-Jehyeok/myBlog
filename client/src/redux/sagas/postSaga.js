import axios from "axios";
import { all, call, put, takeEvery, fork } from "redux-saga/effects";
import { push } from "connected-react-router";
import {
  POST_DELETE_FAILURE,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  POST_DETAIL_LOADING_FAILURE,
  POST_DETAIL_LOADING_REQUEST,
  POST_DETAIL_LOADING_SUCCESS,
  POST_LOADING_FAILURE,
  POST_LOADING_REQUEST,
  POST_LOADING_SUCCESS,
} from "../types";

// All Posts Load
const loadPostAPI = () => {
  return axios.get("/api/post");
};

function* loadPosts() {
  try {
    const result = yield call(loadPostAPI);

    yield put({
      type: POST_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: POST_LOADING_FAILURE,
      payload: e,
    });
  }
}

function* watchloadPosts() {
  yield takeEvery(POST_LOADING_REQUEST, loadPosts);
}

// Post Detail
const loadPostDetailAPI = (payload) => {
  return axios.get(`/api/post/${payload}`);
};

function* loadPostDetail(action) {
  try {
    const result = yield call(loadPostDetailAPI, action.payload);

    yield put({
      type: POST_DETAIL_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: POST_DETAIL_LOADING_FAILURE,
      payload: e,
    });

    yield put(push("/"));
  }
}

function* watchloadPostDetail() {
  yield takeEvery(POST_DETAIL_LOADING_REQUEST, loadPostDetail);
}

// Post Delete
const deletePostAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const token = payload.token;
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return axios.delete(`/api/post/${payload.id}`, config);
};

function* deletePost(action) {
  try {
    const result = yield call(deletePostAPI, action.payload);

    yield put({
      type: POST_DELETE_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: POST_DELETE_FAILURE,
      payload: e,
    });
  }
}

function* watchdeletePost() {
  yield takeEvery(POST_DELETE_REQUEST, deletePost);
}

export default function* postSaga() {
  yield all([
    fork(watchloadPosts),
    fork(watchloadPostDetail),
    fork(watchdeletePost),
  ]);
}

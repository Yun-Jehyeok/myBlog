import axios from "axios";
import { all, call, put, takeEvery, fork } from "redux-saga/effects";
import {} from "connected-react-router";
import {
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

export default function* postSaga() {
  yield all([fork(watchloadPosts)]);
}

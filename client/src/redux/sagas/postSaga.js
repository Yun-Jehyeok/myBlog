import axios from "axios";
import { all, call, put, takeEvery, fork } from "redux-saga/effects";
import { push } from "connected-react-router";
import {
  CATEGORY_FIND_FAILURE,
  CATEGORY_FIND_REQUEST,
  CATEGORY_FIND_SUCCESS,
  POST_DELETE_FAILURE,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  POST_DETAIL_LOADING_FAILURE,
  POST_DETAIL_LOADING_REQUEST,
  POST_DETAIL_LOADING_SUCCESS,
  POST_EDIT_UPLOADING_FAILURE,
  POST_EDIT_UPLOADING_REQUEST,
  POST_EDIT_UPLOADING_SUCCESS,
  POST_LOADING_FAILURE,
  POST_LOADING_REQUEST,
  POST_LOADING_SUCCESS,
  POST_UPLOAD_FAILURE,
  POST_UPLOAD_REQUEST,
  POST_UPLOAD_SUCCESS,
  SEARCH_FAILURE,
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
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

    yield put(push("/postlist"));
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

// Post Upload
const uploadPostAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const token = payload.token;

  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return axios.post("/api/post/write", payload, config);
};

function* uploadPost(action) {
  try {
    const result = yield call(uploadPostAPI, action.payload);

    console.log(result);

    yield put({
      type: POST_UPLOAD_SUCCESS,
      payload: result.data,
    });

    yield put(push("/postlist"));
  } catch (e) {
    yield put({
      type: POST_UPLOAD_FAILURE,
      payload: e,
    });
  }
}

function* watchuploadPost() {
  yield takeEvery(POST_UPLOAD_REQUEST, uploadPost);
}

// Post Edit Upload
const PostEditUploadAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const token = payload.token;

  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return axios.post(`api/post/${payload.id}/edit`, payload, config);
};

function* PostEditUpload(action) {
  try {
    const result = yield call(PostEditUploadAPI, action.payload);

    yield put({
      type: POST_EDIT_UPLOADING_SUCCESS,
      payload: result.data,
    });

    console.log(result);

    yield put(push(`/post/${result.data._id}`));
  } catch (e) {
    yield put({
      type: POST_EDIT_UPLOADING_FAILURE,
      payload: e,
    });
  }
}

function* watchPostEditUpload() {
  yield takeEvery(POST_EDIT_UPLOADING_REQUEST, PostEditUpload);
}

// Find Category
const CategoryFindAPI = (payload) => {
  return axios.get(`/api/post/category/${encodeURIComponent(payload)}`);
};

function* CategoryFind(action) {
  try {
    const result = yield call(CategoryFindAPI, action.payload);

    console.log(result);

    yield put({
      type: CATEGORY_FIND_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: CATEGORY_FIND_FAILURE,
      payload: e,
    });
  }
}

function* watchCategoryFind() {
  yield takeEvery(CATEGORY_FIND_REQUEST, CategoryFind);
}

// Search
const SearchResultAPI = (payload) => {
  return axios.get(`/api/search/${encodeURIComponent(payload)}`);
};

function* SearchResult(action) {
  try {
    const result = yield call(SearchResultAPI, action.payload);

    yield put({
      type: SEARCH_SUCCESS,
      payload: result.data,
    });

    yield put(push(`/search/${encodeURIComponent(action.payload)}`));
  } catch (e) {
    yield put({
      type: SEARCH_FAILURE,
      payload: e,
    });

    action.put(push("/"));
  }
}

function* watchSearchResult() {
  yield takeEvery(SEARCH_REQUEST, SearchResult);
}

export default function* postSaga() {
  yield all([
    fork(watchloadPosts),
    fork(watchloadPostDetail),
    fork(watchdeletePost),
    fork(watchuploadPost),
    fork(watchCategoryFind),
    fork(watchPostEditUpload),
    fork(watchSearchResult),
  ]);
}

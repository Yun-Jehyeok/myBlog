import {
  POST_DETAIL_LOADING_FAILURE,
  POST_DETAIL_LOADING_REQUEST,
  POST_DETAIL_LOADING_SUCCESS,
  POST_LOADING_FAILURE,
  POST_LOADING_REQUEST,
  POST_LOADING_SUCCESS,
  POST_UPLOAD_FAILURE,
  POST_UPLOAD_REQUEST,
  POST_UPLOAD_SUCCESS,
  POST_WRITE_FAILURE,
  POST_WRITE_REQUEST,
  POST_WRITE_SUCCESS,
} from "../types";

const initialState = {
  isAuthenticated: null,
  posts: [],
  postDetail: "",
  postCount: "",
  loading: false,
  error: "",
  creatorId: "",
  categoryFindResult: "",
  title: "",
  searchBy: "",
  searchResult: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case POST_LOADING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case POST_LOADING_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, ...action.payload.postFindResult],
        categoryFindResult: action.payload.categoryFindResult,
        postCount: action.payload.postCount,
        loading: false,
      };
    case POST_LOADING_FAILURE:
      return {
        ...state,
        loading: false,
      };

    case POST_DETAIL_LOADING_REQUEST:
      return {
        ...state,
        posts: [],
        loading: true,
      };
    case POST_DETAIL_LOADING_SUCCESS:
      return {
        ...state,
        loading: false,
        postDetail: action.payload,
        creatorId: action.payload.creator._id,
        title: action.payload.title,
      };
    case POST_DETAIL_LOADING_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case POST_WRITE_REQUEST:
      return {
        ...state,
        posts: [],
        loading: true,
      };
    case POST_WRITE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case POST_WRITE_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case POST_UPLOAD_REQUEST:
      return {
        ...state,
        loading: false,
      };
    case POST_UPLOAD_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case POST_UPLOAD_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}

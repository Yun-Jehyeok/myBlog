import {} from "../types";

const initialState = {
  comments: [],
  creatorId: "",
  loading: false,
  isAuthenticated: false,
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default commentReducer;

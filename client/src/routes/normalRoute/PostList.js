import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { POST_LOADING_REQUEST } from "../../redux/types";
import { Helmet } from "react-helmet";
import { Row } from "reactstrap";
import { GrowingSpinner } from "../../components/spinner/Spinner";
import PostCardOne from "../../components/post/PostCardOne";
import Category from "../../components/post/Category";

function PostList({ theme }) {
  const { posts, categoryFindResult } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: POST_LOADING_REQUEST,
      payload: 0,
    });
  }, [dispatch]);

  return (
    <>
      <br />
      <br />
      <Helmet title="Post List" />
      <Row
        className="d-flex justify-content-center mt-5 py-2 mb-5 sticky-top rounded"
        style={
          theme === "dark" ? style.darkCategoryBox : style.lightCategoryBox
        }
      >
        <Category posts={categoryFindResult} />
      </Row>
      <Row>
        {posts ? <PostCardOne posts={posts} theme={theme} /> : GrowingSpinner}
      </Row>
    </>
  );
}

const style = {
  darkCategoryBox: {
    width: "94%",
    marginLeft: "3%",
    backgroundColor: "white",
    color: "#212529",
    borderLeft: "4px solid gray",
    borderRight: "4px solid gray",
  },
  lightCategoryBox: {
    width: "94%",
    marginLeft: "3%",
    backgroundColor: "#212529",
    color: "white",
    borderLeft: "4px solid gray",
    borderRight: "4px solid gray",
  },
};

export default PostList;

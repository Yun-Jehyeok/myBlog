import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CATEGORY_FIND_REQUEST } from "../../redux/types";
import { Row } from "reactstrap";
import PostCardOne from "../../components/post/PostCardOne";
import { Helmet } from "react-helmet";

function CategoryResult() {
  const dispatch = useDispatch();
  let { categoryName } = useParams();
  const { categoryFindResult } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch({
      type: CATEGORY_FIND_REQUEST,
      payload: categoryName,
    });
  }, [dispatch, categoryname]);

  return (
    <>
      <br />
      <br />
      <Helmet title={`Category - ${categoryName}`} />
      <Row
        className="d-flex justify-content-center mt-5 py-2 mb-5 sticky-top rounded"
        style={
          theme === "dark" ? style.darkCategoryBox : style.lightCategoryBox
        }
      >
        <Category posts={categoryFindResult} />
      </Row>
      <Row>
        <PostCardOne posts={categoryFindResult.posts} />
      </Row>
    </>
  );
}

export default CategoryResult;

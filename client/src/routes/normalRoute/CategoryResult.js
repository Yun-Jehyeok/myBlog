import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CATEGORY_FIND_REQUEST } from "../../redux/types";
import { Row, Button } from "reactstrap";
import PostCardOne from "../../components/post/PostCardOne";
import { Helmet } from "react-helmet";

function CategoryResult({ theme }) {
  const dispatch = useDispatch();
  let { categoryName } = useParams();
  const { categoryFindResult } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch({
      type: CATEGORY_FIND_REQUEST,
      payload: categoryName,
    });
  }, [dispatch, categoryName]);

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
        <div className="mr-3">
          <a href={`/post/category/${categoryName}`}>
            <span>
              <Button>{categoryName}</Button>
            </span>
          </a>
        </div>
      </Row>
      <Row>
        <PostCardOne posts={categoryFindResult.posts} theme={theme} />
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

export default CategoryResult;

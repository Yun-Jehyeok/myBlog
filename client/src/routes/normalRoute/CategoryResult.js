import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CATEGORY_FIND_REQUEST } from "../../redux/types";
import { Row, Button } from "reactstrap";
import PostCardOne from "../../components/post/PostCardOne";
import SearchInput from "../../components/search/SearchInput";
import { Helmet } from "react-helmet";

function CategoryResult({ theme }) {
  const style = {
    categoryBox: {
      width: "94%",
      marginLeft: "3%",
      backgroundColor: `${theme === "dark" ? "white" : "#212529"}`,
      color: `${theme === "dark" ? "#212529" : "white"}`,
      borderLeft: "4px solid gray",
      borderRight: "4px solid gray",
    },
  };

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
      <SearchInput />
      <Row
        className="d-flex justify-content-center mt-3 py-2 mb-5 sticky-top rounded"
        style={style.categoryBox}
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

export default CategoryResult;

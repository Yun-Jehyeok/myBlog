import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SEARCH_REQUEST } from "../../redux/types";
import { Row, Button } from "reactstrap";
import PostCardOne from "../../components/post/PostCardOne";

function Search({ theme }) {
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
  let { searchTerm } = useParams();
  const { searchResult } = useSelector((state) => state.post);

  useEffect(() => {
    if (searchTerm) {
      dispatch({
        type: SEARCH_REQUEST,
        payload: searchTerm,
      });
    }
  }, [dispatch, searchTerm]);

  return (
    <div className="mt-5 mb-5">
      <Row
        className="d-flex justify-content-center mt-5 py-2 mb-5 sticky-top rounded"
        style={style.categoryBox}
      >
        <div className="mr-3">
          <span style={{ fontSize: "1.5rem" }}>
            Search Result for <b>{searchTerm}</b>
          </span>
        </div>
      </Row>
      <Row>
        <PostCardOne posts={searchResult} theme={theme} />
      </Row>
    </div>
  );
}

export default Search;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SEARCH_REQUEST } from "../../redux/types";
import { Row } from "reactstrap";
import PostCardOne from "../../components/post/PostCardOne";

function Search({ theme }) {
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
      <h1 className="mb-5">검색결과: "{searchTerm}"</h1>
      <Row>
        <PostCardOne posts={searchResult} theme={theme} />
      </Row>
    </div>
  );
}

export default Search;

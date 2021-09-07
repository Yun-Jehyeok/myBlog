import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { SEARCH_REQUEST } from 'redux/types';
import { Row } from 'reactstrap';
import PostCardOne from 'components/post/PostCartOne/PostCardOne';
import SearchInput from 'components/search/SearchInput';
import { CategoryBox } from './style';

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
    <>
      <br />
      <br />
      <SearchInput />
      <CategoryBox
        theme={theme}
        className="d-flex justify-content-center mt-3 py-2 mb-5 sticky-top rounded"
      >
        <div className="mr-3">
          <span style={{ fontSize: '1.5rem' }}>
            Search Result for <b>{searchTerm}</b>
          </span>
        </div>
      </CategoryBox>
      <Row>
        <PostCardOne posts={searchResult} theme={theme} />
      </Row>
    </>
  );
}

export default Search;

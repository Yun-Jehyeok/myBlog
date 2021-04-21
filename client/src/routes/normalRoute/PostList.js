import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { POST_LOADING_REQUEST } from "../../redux/types";
import { Helmet } from "react-helmet";
import { Alert, Row } from "reactstrap";
import { GrowingSpinner } from "../../components/spinner/Spinner";
import PostCardOne from "../../components/post/PostCardOne";
import Category from "../../components/post/Category";
import SearchInput from "../../components/search/SearchInput";

function PostList({ theme }) {
  const style = {
    categoryBox: {
      width: "96%",
      marginLeft: "2%",
      backgroundColor: `${theme === "dark" ? "white" : "#212529"}`,
      color: `${theme === "dark" ? "#212529" : "white"}`,
      borderLeft: "4px solid gray",
      borderRight: "4px solid gray",
      transition: "all 0.50s linear",
    },
  };

  const { posts, categoryFindResult, loading, postCount } = useSelector(
    (state) => state.post
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: POST_LOADING_REQUEST,
      payload: 0,
    });
  }, [dispatch]);

  const skipNumberRef = useRef(0);
  const postCountRef = useRef(0);
  const endMsg = useRef(false);

  postCountRef.current = postCount - 6;

  const useOnScreen = (options) => {
    const lastPostElementRef = useRef();

    const [visible, setVisible] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
        setVisible(entry.isIntersecting);

        if (entry.isIntersecting) {
          let remainPostCount = postCountRef.current - skipNumberRef.current;

          if (remainPostCount >= 0) {
            dispatch({
              type: POST_LOADING_REQUEST,
              payload: skipNumberRef.current + 6,
            });
            skipNumberRef.current += 6;
          } else {
            endMsg.current = true;
          }
        }
      }, options);

      if (lastPostElementRef.current) {
        observer.observe(lastPostElementRef.current);
      }

      const LastElementReturnFunc = () => {
        if (lastPostElementRef.current) {
          observer.unobserve(lastPostElementRef.current);
        }
      };

      return LastElementReturnFunc;
    }, [lastPostElementRef, options]);

    return [lastPostElementRef, visible];
  };

  const [lastPostElementRef, visible] = useOnScreen({
    threshold: "0.5",
  });

  return (
    <>
      <br />
      <br />
      <Helmet title="YLOG - POST" />
      <SearchInput />
      <Row
        className="d-flex justify-content-center mt-3 py-2 mb-5 sticky-top rounded"
        style={style.categoryBox}
      >
        <Category posts={categoryFindResult} />
      </Row>
      <Row>
        {posts ? <PostCardOne posts={posts} theme={theme} /> : GrowingSpinner}
      </Row>
      <div ref={lastPostElementRef}>{loading && GrowingSpinner}</div>
      {loading ? (
        ""
      ) : endMsg ? (
        <div className="mt-4" style={{ width: "94%", marginLeft: "3%" }}>
          <Alert color="danger" className="text-center font-weight-bolder">
            더 이상의 포스트가 없습니다.
          </Alert>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default PostList;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import {
  POST_DETAIL_LOADING_REQUEST,
  USER_LOADING_REQUEST,
  POST_DELETE_REQUEST,
} from "../../redux/types";
import { Row, Col, Container, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { GrowingSpinner } from "../../components/spinner/Spinner";

function PostDetail(req) {
  const dispatch = useDispatch();
  const { postDetail, creatorId, title, loading } = useSelector(
    (state) => state.post
  );
  const { userId, userName } = useSelector((state) => state.auth);
  const { comments } = useSelector((state) => state.comment);

  useEffect(() => {
    dispatch({
      type: POST_DETAIL_LOADING_REQUEST,
      payload: req.match.params.id,
    });

    dispatch({
      type: USER_LOADING_REQUEST,
      payload: localStorage.getItem("token"),
    });
  }, [dispatch, req.match.params.id]);

  const onDeleteClick = () => {
    dispatch({
      type: POST_DELETE_REQUEST,
      payload: {
        id: req.match.params.id,
        token: localStorage.getItem("token"),
      },
    });
  };

  const EditButton = (
    <>
      <Row className="d-flex justify-content-center pb-3">
        <Col className="col-md-3 mr-md-3">
          <Link
            to={`/post/${req.match.params.id}/edit`}
            className="btn btn-success btn-block"
          >
            Edit Post
          </Link>
        </Col>
        <Col>
          <Button className="btn-danger btn-block" onClick={onDeleteClick}>
            Delete
          </Button>
        </Col>
      </Row>
    </>
  );

  const Body = (
    <>
      {userId === creatorId ? EditButton : ""}
      <Row className="d-flex p-3 mb-1 justify-content-center mt-5">
        {(() => {
          if (postDetail && postDetail.creator) {
            return (
              <>
                <div className="font-weight-bold" style={{ fontSize: "3rem" }}>
                  {postDetail.title}
                </div>
              </>
            );
          }
        })()}
      </Row>
      {postDetail && postDetail.comments ? (
        <>
          <div
            className="d-flex justify-content-end pb-4"
            style={{ borderBottom: "1px solid gray" }}
          >
            <span className="text-muted" style={{ fontSize: "1.2rem" }}>
              Posted on {postDetail.date.split(" ")[0]}
            </span>
          </div>
          <div
            className="mb-3 mt-4 p-3"
            style={{
              width: "100%",
              height: "auto",
              minHeight: "20vh",
              wordBreak: "break-all",
            }}
          >
            {postDetail.contents.replace(/(<([^>]+)>)/gi, "")}
          </div>
          <Row>
            <Container className="mb-3">
              {Array.isArray(comments)
                ? comments.map(
                    ({ contents, creator, date, _id, creatorName }) => (
                      <div key={_id} className="mb-3">
                        <Row className="d-flex justify-content-between p-2">
                          <div className="font-weight-bold">
                            {creatorName ? creatorName : creator}
                          </div>
                          <div className="text-small">
                            <span>{date.split(" ")[0]}</span>
                          </div>
                        </Row>
                        <Row className="p-2">
                          <div>{contents}</div>
                        </Row>
                      </div>
                    )
                  )
                : "Creator"}
            </Container>
          </Row>
        </>
      ) : (
        ""
      )}
    </>
  );

  return (
    <div>
      <Helmet title={`Post - ${title}`} />
      {loading === true ? GrowingSpinner : Body}
    </div>
  );
}

export default PostDetail;
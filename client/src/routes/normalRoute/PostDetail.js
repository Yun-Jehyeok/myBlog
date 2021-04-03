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
import { CKEditor } from "@ckeditor/ckeditor5-react";
import BalloonEditor from "@ckeditor/ckeditor5-editor-balloon/src/ballooneditor";
import { editorConfiguration } from "../../components/editor/EditorConfig";
import Comments from "../../components/comments/Comments";

function PostDetail(req) {
  const dispatch = useDispatch();
  const { postDetail, creatorId, title, loading } = useSelector(
    (state) => state.post
  );
  const { userId, userName } = useSelector((state) => state.auth);
  const { comments } = useSelector((state) => state.comment);

  const { date } = postDetail;

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
        <Col>
          <a
            href={`/post/${req.match.params.id}/edit`}
            className="btn btn-success btn-block"
          >
            Edit Post
          </a>
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
    <Container
      style={false ? style.darkContainer : style.lightContainer}
      className="mb-4 p-3"
    >
      {userId === creatorId ? EditButton : ""}
      <Row className="d-flex p-3 mb-1 justify-content-center mt-3 pt-5">
        {(() => {
          if (postDetail && postDetail.creator) {
            return (
              <div className="font-weight-bold" style={{ fontSize: "3rem" }}>
                {postDetail.title}
              </div>
            );
          }
        })()}
      </Row>
      {postDetail && postDetail.comments ? (
        <>
          <div
            className="d-flex justify-content-between pb-4"
            style={{ borderBottom: "1px solid gray" }}
          >
            <span className="ml-2">
              <Button outline color="primary">
                {postDetail.category.categoryName}
              </Button>
            </span>
            <span className="text-muted" style={{ fontSize: "1.2rem" }}>
              Posted on {date.split(" ")[0]}&nbsp;
              {date.split(" ")[1]} {date.split(" ")[2]}
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
            <CKEditor
              editor={BalloonEditor}
              data={postDetail.contents}
              config={editorConfiguration}
              disabled="true"
            />
          </div>
          <Row>
            <Container className="mb-3">
              <div>
                <b>{comments.length}&nbsp;Comments</b>
              </div>
              <hr />
              <Comments
                id={req.match.params.id}
                userId={userId}
                userName={userName}
              />
              {Array.isArray(comments)
                ? comments.map(
                    ({ contents, creator, date, _id, creatorName }) => (
                      <div key={_id} className="mb-3">
                        <Row className="d-flex justify-content-between p-2">
                          <div
                            className="font-weight-bold"
                            style={{ fontSize: "0.9rem" }}
                          >
                            {creatorName ? creatorName : creator}
                            &nbsp;&nbsp;&nbsp;
                            <span
                              className="font-weight-light"
                              style={{ color: "gray", fontSize: "0.9em" }}
                            >
                              •&nbsp;{date}
                            </span>
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
          <hr />
        </>
      ) : (
        ""
      )}
    </Container>
  );

  return (
    <div>
      <Helmet title={title} />
      {loading === true ? GrowingSpinner : Body}
    </div>
  );
}

const style = {
  darkContainer: {
    backgroundColor: "#212529",
    color: "white",
    minHeight: "70vh",
  },
  lightContainer: {
    backgroundColor: "white",
    color: "black",
    minHeight: "70vh",
  },
};

export default PostDetail;

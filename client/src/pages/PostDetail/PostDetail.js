import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import {
  POST_DETAIL_LOADING_REQUEST,
  USER_LOADING_REQUEST,
  POST_DELETE_REQUEST,
  COMMENT_DELETE_REQUEST,
} from 'redux/types';
import { Row, Container, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { GrowingSpinner } from 'components/spinner/Spinner';
import Comments from 'components/comments/Comments';

//////////////////////////////////////////////
// Toast UI Viewer
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import 'codemirror/lib/codemirror.css';
import { Viewer } from 'components/editor/viewer/index';
import { Wrap, Editor } from 'pages/PostDetail/style';

function PostDetail(req) {
  const theme = localStorage.getItem('theme');

  const dispatch = useDispatch();
  const { postDetail, creatorId, title, loading } = useSelector(
    (state) => state.post,
  );
  const { userId, userName } = useSelector((state) => state.auth);
  const { comments /* errorMsg */ } = useSelector((state) => state.comment);
  // const [localMsg, setLocalMsg] = useState("");

  const { date, creator, category, contents } = postDetail;

  useEffect(() => {
    dispatch({
      type: POST_DETAIL_LOADING_REQUEST,
      payload: req.match.params.id,
    });

    dispatch({
      type: USER_LOADING_REQUEST,
      payload: localStorage.getItem('token'),
    });
  }, [dispatch, req.match.params.id]);

  // useEffect(() => {
  //   try {
  //     setLocalMsg(errorMsg);
  //     alert(localMsg);

  //     dispatch({
  //       type: CLEAR_COMMENT_ERROR_REQUEST,
  //     });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }, [errorMsg]);

  const onDeleteClick = () => {
    dispatch({
      type: POST_DELETE_REQUEST,
      payload: {
        id: req.match.params.id,
        token: localStorage.getItem('token'),
      },
    });
  };

  const onCommentDeleteClick = (commentId) => {
    dispatch({
      type: COMMENT_DELETE_REQUEST,
      payload: {
        userId: userId,
        commentId: commentId,
        postId: req.match.params.id,
        token: localStorage.getItem('token'),
      },
    });
  };

  const EditButton = (
    <>
      <div className="d-flex justify-content-end pb-3">
        <div className="mr-2">
          <Link
            to={`/post/${req.match.params.id}/edit`}
            className="btn btn-success btn-block"
          >
            EDIT
          </Link>
        </div>
        <div>
          <Button className="btn-danger btn-block" onClick={onDeleteClick}>
            DELETE
          </Button>
        </div>
      </div>
    </>
  );

  const Body = (
    <Wrap className="mb-4 p-3" theme={theme}>
      <Row className="d-flex p-3 mb-1 justify-content-center mt-3 pt-5">
        {(() => {
          if (postDetail && creator) {
            return (
              <div className="font-weight-bold" style={{ fontSize: '2.5rem' }}>
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
            style={{ borderBottom: '1px solid gray' }}
          >
            <span className="ml-2">
              <Button outline color="primary">
                {category.categoryName}
              </Button>
            </span>
            <span className="text-muted" style={{ fontSize: '1.2rem' }}>
              Posted on {date.split(' ')[0]}&nbsp;
              {date.split(' ')[1]} {date.split(' ')[2]}
            </span>
          </div>
          <Editor className="mb-3 mt-4 p-3">
            <Viewer height="600px" initialValue={contents} />
          </Editor>
          {userId === creatorId ? EditButton : ''}
          <Row>
            <Container>
              <div
                style={{
                  borderBottom: `1px solid ${
                    theme === 'dark' ? 'white' : 'gray'
                  }`,
                }}
              >
                <b>{comments.length}&nbsp;Comments</b>
              </div>
              <Comments
                id={req.match.params.id}
                userId={userId}
                userName={userName}
              />
              {Array.isArray(comments)
                ? comments.map(
                    ({ contents, creator, date, _id, creatorName }) => (
                      <div key={_id} className="mb-2">
                        <Row className="d-flex justify-content-between p-2">
                          <div style={{ fontSize: '1.1rem' }}>
                            <b>{creatorName ? creatorName : creator}</b>&nbsp;•
                            <span
                              className="font-weight-light"
                              style={{ color: 'gray', fontSize: '0.8em' }}
                            >
                              &nbsp;{date}
                            </span>
                          </div>
                        </Row>
                        <Row className="p-2">
                          <div>{contents}</div>
                        </Row>
                        {creator === userId && userId ? (
                          <div className="d-flex justify-content-end">
                            <span
                              style={{ cursor: 'pointer' }}
                              onClick={() => onCommentDeleteClick(_id)}
                            >
                              삭제
                            </span>
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                    ),
                  )
                : 'Creator'}
            </Container>
          </Row>
          <hr />
        </>
      ) : (
        ''
      )}
    </Wrap>
  );

  return (
    <div>
      <Helmet title={title} />
      {loading === true ? GrowingSpinner : Body}
    </div>
  );
}

export default PostDetail;

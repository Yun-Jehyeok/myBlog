import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Progress,
} from "reactstrap";
import { POST_UPLOAD_REQUEST } from "../../redux/types";

////////////////////// Use TUI
import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";

function PostWrite() {
  /////////////// Use TUI
  const editorRef = useRef();
  const [contents, setContents] = useState("");

  const { isAuthenticated } = useSelector((state) => state.auth);
  const [form, setValues] = useState({
    title: "",
    contents: "",
    fileUrl: "",
  });
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    await e.preventDefault();

    setContents(editorRef.current.getInstance().getHtml());

    const { title, fileUrl, category } = form;
    const token = localStorage.getItem("token");
    const body = { title, contents, fileUrl, category, token };

    dispatch({
      type: POST_UPLOAD_REQUEST,
      payload: body,
    });
  };

  const onChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // const getDataFromCKEditor = (event, editor) => {
  //   const data = editor.getData();

  //   if (data && data.match("<img src=")) {
  //     const whereImg_start = data.indexOf("<img src=");

  //     let whereImg_end = "";
  //     let ext_name_find = "";
  //     let result_Img_Url = "";

  //     const ext_name = ["jpeg", "png", "gif", "jpg"];

  //     for (let i = 0; i < ext_name.length; i++) {
  //       if (data.match(ext_name[i])) {
  //         ext_name_find = ext_name[i];

  //         whereImg_end = data.indexOf(`${ext_name[i]}`);
  //       }
  //     }

  //     if (ext_name_find === "jpeg") {
  //       result_Img_Url = data.substring(whereImg_start + 10, whereImg_end + 4);
  //     } else {
  //       result_Img_Url = data.substring(whereImg_start + 10, whereImg_end + 3);
  //     }

  //     setValues({
  //       ...form,
  //       fileUrl: result_Img_Url,
  //       contents: data,
  //     });
  //   } else {
  //     setValues({
  //       ...form,
  //       fileUrl: "",
  //       contents: data,
  //     });
  //   }
  // };

  return (
    <div>
      {isAuthenticated ? (
        <Form onSubmit={onSubmit} className="mt-5">
          <FormGroup className="mb-3">
            <Label for="title">Title</Label>
            <Input
              type="text"
              name="title"
              id="title"
              className="form-control"
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <Label for="category">Category</Label>
            <Input
              type="text"
              name="category"
              id="category"
              className="form-control"
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <Label for="content">Content</Label>
            <Editor
              previewStyle="vertical"
              height="700px"
              initialEditType="markdown"
              placeholder="글쓰기"
              ref={editorRef}
            />
            <Button
              color="success"
              block
              className="mt-3 col-md-2 offset-md-10 mb-3"
            >
              작성하기
            </Button>
          </FormGroup>
        </Form>
      ) : (
        <Col width={50} className="p-5 m-5">
          <Progress animated color="info" value={100} />
        </Col>
      )}
    </div>
  );
}

export default PostWrite;

import React, { useState } from "react";
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
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import { editorConfiguration } from "../../components/editor/EditorConfig";
import Myinit from "../../components/editor/UploadAdapter";

import { POST_UPLOAD_REQUEST } from "../../redux/types";

import dotenv from "dotenv";
dotenv.config();

function PostWrite() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [form, setValues] = useState({
    title: "",
    contents: "",
    fileUrl: "",
  });
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    await e.preventDefault();

    const { title, contents, fileUrl, category } = form;
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

  return (
    <div>
      {isAuthenticated ? (
        <Form onSubmit={onSubmit}>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              type="text"
              name="title"
              id="title"
              className="form-control"
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="category">Category</Label>
            <Input
              type="text"
              name="category"
              id="category"
              className="form-control"
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="content">Content</Label>
            <CKEditor
              editor={ClassicEditor}
              config={editorConfiguration}
              onReady={Myinit}
            />
            <Button>작성하기</Button>
          </FormGroup>
        </Form>
      ) : (
        <Col>
          <Progress animated color="info" value={100} />
        </Col>
      )}
    </div>
  );
}

export default PostWrite;

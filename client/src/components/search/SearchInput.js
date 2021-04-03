import React, { useState, useRef } from "react";
import { Form, Input } from "reactstrap";
import { useDispatch } from "react-redux";
import { SEARCH_REQUEST } from "../../redux/types";

function SearchInput() {
  const dispatch = useDispatch();
  const [form, setValues] = useState({ searchBy: "" });

  const onChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: [e.target.value],
    });
  };

  const onSubmit = async (e) => {
    await e.preventDefault();
    const { searchBy } = form;

    dispatch({
      type: SEARCH_REQUEST,
      payload: searchBy,
    });

    resetValue.current.value = "";
  };

  const resetValue = useRef(null);

  return (
    <>
      <Form onSubmit={onSubmit} className="col">
        <Input
          name="searchBy"
          onChange={onChange}
          innerRef={resetValue}
          className="form-control is-valid"
          placeholder="Search"
        />
      </Form>
    </>
  );
}

export default SearchInput;

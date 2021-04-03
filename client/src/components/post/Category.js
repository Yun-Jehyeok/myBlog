import React from "react";
import { Button } from "reactstrap";

import { Link } from "react-router-dom";

function Category({ posts }) {
  return (
    <>
      {Array.isArray(posts)
        ? posts.map(({ _id, categoryName }) => (
            <div key={_id} className="mr-3">
              <a href={`/post/category/${categoryName}`}>
                <span>
                  <Button>{categoryName}</Button>
                </span>
              </a>
            </div>
          ))
        : ""}
    </>
  );
}

export default Category;

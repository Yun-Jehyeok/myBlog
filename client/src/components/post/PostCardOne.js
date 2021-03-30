import React from "react";
import { Link } from "react-router-dom";

function PostCardOne({ posts, theme }) {
  return (
    <>
      {Array.isArray(posts)
        ? posts.map(({ _id, title, contents, categoryName, date }) => {
            return (
              <div key={_id} className="mb-3" style={style.container}>
                <Link
                  to={`/post/${_id}`}
                  className="text-light text-decoration-none"
                  style={theme === "dark" ? {} : { color: "#212529" }}
                >
                  <div style={style.title}>
                    <b>{title}</b>&nbsp;{categoryName}
                  </div>
                  <div className="mt-3" style={style.contents}>
                    {contents.length >= 70
                      ? contents.replace(/(<([^>]+)>)/gi, "").slice(0, 70) +
                        "..."
                      : contents.replace(/(<([^>]+)>)/gi, "")}
                  </div>
                  <div
                    className="d-flex justify-content-end mt-4"
                    style={style.date}
                  >
                    Posted on {date.split(" ")[0]}&nbsp;{date.split(" ")[1]}{" "}
                    {date.split(" ")[2]}
                  </div>
                </Link>
              </div>
            );
          })
        : ""}
    </>
  );
}

const style = {
  container: {
    width: "90%",
    marginLeft: "5%",
  },
  title: {
    fontSize: "2.2rem",
  },
  contents: {
    fontSize: "1.3rem",
  },
  date: { color: "gray", fontSize: "1.2rem" },
};

export default PostCardOne;

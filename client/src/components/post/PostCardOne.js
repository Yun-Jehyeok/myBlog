import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 90%;
  margin-left: 5%;
  transition: all 0.5s linear;
`;
const Title = styled.div`
  font-size: 2.2rem;
  transition: all 0.5s linear;
`;
const Content = styled.div`
  font-size: 1.3rem;
  transition: all 0.5s linear;
`;
const Date = styled.div`
  color: gray;
  font-size: 1.2rem;
`;

function PostCardOne({ posts, theme }) {
  return (
    <>
      {Array.isArray(posts)
        ? posts.map(({ _id, title, contents, category, date }) => {
            return (
              <Container key={_id} id="postCard" className="mb-3">
                <a
                  href={`/post/${_id}`}
                  className="text-light text-decoration-none"
                >
                  <div
                    className={theme === "dark" ? "text-white" : "text-dark"}
                  >
                    <Title>
                      <b>{title}</b>
                    </Title>
                    <Content className="mt-3">
                      {contents.length >= 70
                        ? contents.replace(/(<([^>]+)>)/gi, "").slice(0, 140) +
                          "..."
                        : contents.replace(/(<([^>]+)>)/gi, "")}
                    </Content>
                  </div>
                  <Date className="d-flex justify-content-end mt-4">
                    <span>
                      Posted on {date.split(" ")[0]}&nbsp;{date.split(" ")[1]}{" "}
                      {date.split(" ")[2]}
                    </span>
                  </Date>
                </a>
              </Container>
            );
          })
        : ""}
    </>
  );
}

export default PostCardOne;

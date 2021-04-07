import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export const EditProtectedRoute = ({ component: Component, ...rest }) => {
  const { userId } = useSelector((state) => state.auth);
  const { creatorId } = useSelector((state) => state.post);

  //로그인한 유저랑 작성자랑 같으면 수정할 페이지로 가고
  // 아니면 홈으로 돌아가도록 하는 것
  return (
    <Route
      {...rest}
      render={(props) => {
        if (userId === creatorId) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

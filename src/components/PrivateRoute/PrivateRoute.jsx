import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRoute = ({ path, ...props }) => {
  const { token } = useSelector((state) => state.auth);

  return token ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate to="/login" replace state={{ from: path }} />
  );
};

import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRoute = ({ path, ...props }) => {
  const { isUserLoggedIn } = useSelector((state) => state.auth);

  return isUserLoggedIn ? (
    <Route {...props} />
  ) : (
    <Navigate to="/login" replace state={{ from: path }} />
  );
};

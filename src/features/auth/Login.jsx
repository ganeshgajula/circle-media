import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./authSlice";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const allFieldsEntered = email && password;
  const { isUserLoggedIn, status, currentUser } = useSelector(
    (state) => state.auth
  );

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  useEffect(
    () => {
      if (isUserLoggedIn) {
        navigate(state?.from ? state.from : "/");
      }
    },
    // eslint-disable-next-line
    [isUserLoggedIn]
  );

  console.log(currentUser);
  return (
    <div className="flex flex-col items-center h-screen mt-10">
      <h1 className="text-3xl font-bold mb-2">Log in to Circle Media</h1>
      <form
        onSubmit={loginHandler}
        className="flex flex-col justify-around h-2/6 w-11/12 sm:w-7/12 md:w-3/12"
      >
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded-md"
        />
        <input
          type="text"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded-md"
        />
        <button
          type="submit"
          className={`border py-2 text-lg bg-blue-500 text-white rounded-lg ${
            !allFieldsEntered && "opacity-60 cursor-default"
          }`}
          disabled={!allFieldsEntered}
        >
          {status === "loading" ? "Logging in..." : "Login"}
        </button>
      </form>
      <p>
        Don't have an account?
        <button
          onClick={() => navigate("/signup")}
          className="text-blue-600 pl-1"
        >
          Sign up
        </button>
      </p>
    </div>
  );
};

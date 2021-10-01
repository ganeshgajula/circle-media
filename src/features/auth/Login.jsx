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
  const { token, status, currentUser } = useSelector((state) => state.auth);
  const [guestLogin, setGuestLogin] = useState(false);
  const [normalLogin, setNormalLogin] = useState(false);

  const loginHandler = (e) => {
    e.preventDefault();
    setNormalLogin(true);
    dispatch(loginUser({ email, password }));
  };

  const loginAsGuest = () => {
    setGuestLogin(true);
    dispatch(loginUser({ email: "ganesh@gmail.com", password: "ganesh" }));
  };

  useEffect(() => {
    if (token) {
      navigate(state?.from ? state.from : "/");
    }
  }, [token, state, navigate]);

  console.log(currentUser);
  return (
    <div className="flex flex-col items-center h-screen mt-10">
      <h1 className="text-3xl font-bold mb-2">Log in to Circle Media</h1>
      <form
        onSubmit={loginHandler}
        className={`flex flex-col justify-around h-1/4 w-11/12 sm:w-7/12 md:w-3/12 ${
          guestLogin && "h-1/6"
        }`}
      >
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded-md"
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded-md"
        />
        <button
          type="submit"
          className={`border py-2 text-lg bg-blue-500 text-white rounded-lg ${
            !allFieldsEntered && "opacity-60 cursor-default"
          } ${guestLogin && "hidden"}`}
          disabled={!allFieldsEntered}
        >
          {status === "loading" ? "Logging in..." : "Login"}
        </button>
      </form>
      <button
        onClick={loginAsGuest}
        className={`border py-2 text-lg bg-blue-500 text-white rounded-lg mb-3 w-11/12 sm:w-7/12 md:w-3/12 ${
          guestLogin && "mt-1"
        } ${normalLogin && "hidden"}`}
      >
        {status === "loading" ? "Logging in..." : "Login as Guest"}
      </button>
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

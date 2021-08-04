import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signUpHandler = async (e) => {
    e.preventDefault();
    console.log("Signup successful");
  };

  const allFieldsEntered =
    firstname && lastname && username && email && password;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl mb-2 font-bold">Sign up</h1>
      <form
        onSubmit={signUpHandler}
        className="flex flex-col justify-around h-4/6 w-11/12 sm:w-7/12 md:w-3/12"
      >
        <input
          type="text"
          placeholder="Enter firstname"
          value={firstname}
          onChange={(e) => setFirstName(e.target.value)}
          className="p-2 border rounded-md"
        />
        <input
          type="text"
          placeholder="Enter lastname"
          value={lastname}
          onChange={(e) => setLastName(e.target.value)}
          className="p-2 border rounded-md"
        />

        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 border rounded-md"
        />

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
          className={`border py-2 text-lg bg-blue-500 text-white rounded-lg font-medium ${
            !allFieldsEntered && "opacity-60 cursor-default"
          }`}
          disabled={!allFieldsEntered}
        >
          Sign Up
        </button>
      </form>
      <p>
        Already have an account?
        <button
          onClick={() => navigate("/login")}
          className="text-blue-600 pl-1"
        >
          Login
        </button>
      </p>
    </div>
  );
};

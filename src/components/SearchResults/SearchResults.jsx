import React from "react";
import { useSelector } from "react-redux";

export const SearchResults = ({ searchedKeyword }) => {
  const users = useSelector((state) => state.users);

  const matchedUsersList = users.users.filter((user) =>
    user.userName.toLowerCase().includes(searchedKeyword.toLowerCase())
  );

  return (
    <div className="w-80 h-96 bg-white shadow-md rounded-lg p-4">
      {searchedKeyword && matchedUsersList.length ? (
        matchedUsersList.map((user) => (
          <div>
            <h3>{user.name}</h3>
            <p>{user.userName}</p>
          </div>
        ))
      ) : (
        <p>{!matchedUsersList.length ? "No user found" : "Search Users"}</p>
      )}
    </div>
  );
};

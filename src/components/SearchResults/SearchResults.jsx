import React from "react";
import { useSelector } from "react-redux";

export const SearchResults = ({ searchedKeyword }) => {
  const users = useSelector((state) => state.users);

  const matchedUsersList = users.users.filter(
    (user) =>
      user.userName.toLowerCase().includes(searchedKeyword.toLowerCase()) ||
      user.name.toLowerCase().includes(searchedKeyword.toLowerCase())
  );

  return (
    <div className="inline-block w-80 h-auto max-h-96 bg-white shadow-md rounded-lg px-3 pt-2 overflow-y-auto">
      {searchedKeyword && matchedUsersList.length ? (
        matchedUsersList.map((user) => {
          let initials = "";
          user.name.split(" ").map((username) => (initials += username[0]));

          return (
            <div className="flex items-center space-x-4 mb-3">
              <div className="h-12 w-12 bg-blue-500 text-white rounded-full flex items-center justify-center">
                <span className="text-xl font-semibold">{initials}</span>
              </div>
              <div className="flex flex-col">
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-gray-500">@{user.userName}</p>
              </div>
            </div>
          );
        })
      ) : (
        <p className="font-medium text-gray-500 mb-2">
          {!matchedUsersList.length ? "No user found" : "Search Users"}
        </p>
      )}
    </div>
  );
};

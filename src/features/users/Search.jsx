import React, { useState } from "react";
import { useSelector } from "react-redux";
import { SearchIcon } from "../../assets";
import { UserCard } from "./UserCard";

export const Search = () => {
  const { users } = useSelector((state) => state.users);

  const [searchedKeyword, setSearchedKeyword] = useState("");

  const matchedUsers = users.filter(
    ({ firstname, lastname, username }) =>
      firstname.toLowerCase().includes(searchedKeyword.toLowerCase()) ||
      lastname.toLowerCase().includes(searchedKeyword.toLowerCase()) ||
      username.toLowerCase().includes(searchedKeyword.toLowerCase())
  );

  console.log("users", users);

  return (
    <div>
      <div className="flex justify-between items-center px-3 py-3 border-b border-gray-100 sticky top-0 w-full bg-white cursor-pointer">
        <span className="text-xl font-extrabold">Search</span>
      </div>
      <div className="px-3 py-3">
        <div className="flex items-center bg-extra-light-gray rounded-full">
          <div>
            <SearchIcon />
          </div>

          <input
            type="text"
            value={searchedKeyword}
            onChange={(e) => setSearchedKeyword(e.target.value)}
            className="bg-extra-light-gray py-2 px-4 text-base rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            placeholder="Search users"
          />
        </div>
      </div>
      {searchedKeyword && matchedUsers.length ? (
        matchedUsers.map((user) => <UserCard {...user} key={user._id} />)
      ) : (
        <p className="font-medium text-center text-gray-500 px-3 py-2">
          {!matchedUsers.length
            ? "No user found"
            : "Try searching for people by their name or username"}
        </p>
      )}
    </div>
  );
};

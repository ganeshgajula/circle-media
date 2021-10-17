import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const SearchResults = ({
  searchedKeyword,
  setSearchPopOver,
  setSearchedKeyword,
}) => {
  const { users } = useSelector((state) => state.users);
  const navigate = useNavigate();

  const [isLinkBroken, setIsLinkBroken] = useState(false);

  const matchedUsersList = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchedKeyword.toLowerCase()) ||
      user.firstname.toLowerCase().includes(searchedKeyword.toLowerCase()) ||
      user.lastname.toLowerCase().includes(searchedKeyword.toLowerCase())
  );

  return (
    <div className="inline-block w-80 h-auto max-h-96 bg-white shadow-md rounded-lg overflow-y-auto">
      {searchedKeyword && matchedUsersList.length ? (
        matchedUsersList.map(
          ({ _id, avatar, firstname, lastname, username }) => {
            const firstNameInitial = firstname[0];
            const lastNameInitial = lastname[0];
            const userInitials = `${firstNameInitial}${lastNameInitial}`;

            return (
              <div
                key={_id}
                className="flex items-center space-x-4 px-3 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  navigate(`/profile/${username}`);
                  setSearchPopOver(false);
                  setSearchedKeyword("");
                }}
              >
                {!avatar || isLinkBroken ? (
                  <div className="h-12 w-12 bg-blue-500 text-white rounded-full flex items-center justify-center">
                    <span className="text-xl font-semibold">
                      {userInitials}
                    </span>
                  </div>
                ) : (
                  <img
                    onError={() => setIsLinkBroken(true)}
                    src={avatar}
                    alt="avatar"
                    className="object-cover rounded-full h-12 w-12"
                  />
                )}
                <div className="flex flex-col">
                  <h3 className="font-semibold">
                    {firstname} {lastname}
                  </h3>
                  <p className="text-gray-500">@{username}</p>
                </div>
              </div>
            );
          }
        )
      ) : (
        <p className="font-medium text-gray-500 px-3 py-2">
          {!matchedUsersList.length ? "No user found" : "Search Users"}
        </p>
      )}
    </div>
  );
};

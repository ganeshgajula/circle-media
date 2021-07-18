import React, { useState } from "react";
import { useSelector } from "react-redux";
import { VerifiedBadgeIcon } from "../../assets";

export const SuggestionBox = () => {
  const users = useSelector((state) => state.users);
  const [showMoreSuggestions, setShowMoreSuggestions] = useState(false);

  const showOnlyThreeProfiles = 3;
  const showOnlyFiveProfiles = 5;
  const arrayEndValue = !showMoreSuggestions
    ? showOnlyThreeProfiles
    : showOnlyFiveProfiles;

  return (
    <div className="mt-12 flex flex-col bg-blue-500 w-22 bg-extra-light-gray rounded-2xl fixed top-24">
      <div className="font-extrabold text-gray-900 px-3 py-2 text-xl border-b border-gray-200 ">
        Who to follow
      </div>
      <div>
        {users.users.slice(0, arrayEndValue).map((user) => {
          let initials = "";
          user.name
            .split(" ")
            .map((username) => (initials += username[0].toUpperCase()));

          return (
            <div
              key={user.userId}
              className="flex items-center justify-between px-3 py-2 border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 bg-blue-500 text-white rounded-full flex items-center justify-center">
                  <span className="font-semibold text-lg">{initials}</span>
                </div>
                <div>
                  <div className="flex items-center space-x-1">
                    <h3 className="font-bold">{user.name}</h3>
                    <VerifiedBadgeIcon />
                  </div>
                  <p className="text-gray-500">@{user.userName}</p>
                </div>
              </div>
              <button className="text-primary font-semibold border border-blue-400 rounded-2xl px-3 py-1 hover:bg-blue-100">
                Follow
              </button>
            </div>
          );
        })}
      </div>
      <div
        className="px-3 py-3 text-primary cursor-pointer hover:bg-gray-100 rounded-b-2xl"
        onClick={() => setShowMoreSuggestions((prev) => !prev)}
      >
        {!showMoreSuggestions ? "Show more" : "Show less"}
      </div>
    </div>
  );
};

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VerifiedBadgeIcon } from "../../assets";
import { followUnfollowUser } from "../../features/users/usersSlice";
import { isUserIdPresent } from "../../utils/utils";

export const SuggestionBox = () => {
  const { users } = useSelector((state) => state.users);
  const { currentUser } = useSelector((state) => state.auth);
  const [showMoreSuggestions, setShowMoreSuggestions] = useState(false);
  const dispatch = useDispatch();

  const showOnlyThreeProfiles = 3;
  const showOnlyFiveProfiles = 5;
  const arrayEndValue = !showMoreSuggestions
    ? showOnlyThreeProfiles
    : showOnlyFiveProfiles;

  return (
    <div className="mt-12 flex flex-col bg-blue-500 lg:w-30 xl:w-22 bg-extra-light-gray rounded-2xl fixed top-24">
      <div className="font-extrabold text-gray-900 px-3 py-2 text-xl border-b border-gray-200 ">
        Who to follow
      </div>
      <div>
        {users
          .slice(0, arrayEndValue)
          .map(({ _id, firstname, lastname, username, email }) => {
            const firstNameInitial = firstname[0];
            const lastNameInitial = lastname[0];
            const userInitials = `${firstNameInitial}${lastNameInitial}`;

            return (
              <div
                key={_id}
                className={`${
                  _id === currentUser?._id && "hidden"
                } flex items-center justify-between px-3 py-2 border-b border-gray-200 hover:bg-gray-100 cursor-pointer`}
              >
                <div className="flex items-center space-x-3 mr-12">
                  <div className="h-12 w-12 bg-blue-500 text-white rounded-full flex items-center justify-center">
                    <span className="font-semibold text-lg">
                      {userInitials}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-1">
                      <h3 className="font-bold">
                        {firstname} {lastname}
                      </h3>
                      <VerifiedBadgeIcon />
                    </div>
                    <p className="text-gray-500">@{username}</p>
                  </div>
                </div>
                <button
                  className={`${
                    !isUserIdPresent(currentUser?.following, _id)
                      ? "border border-blue-400 hover:bg-blue-100 text-primary py-1"
                      : "bg-primary text-white py-1"
                  }  font-semibold rounded-2xl px-3 py-1`}
                  onClick={() =>
                    dispatch(
                      followUnfollowUser({
                        emailId: email,
                        currentLoggedInUserId: currentUser?._id,
                      })
                    )
                  }
                >
                  {!isUserIdPresent(currentUser?.following, _id)
                    ? "Follow"
                    : "Following"}
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

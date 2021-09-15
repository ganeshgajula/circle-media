import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isUserPresent } from "../../utils/utils";
import { followUnfollowUser } from "./usersSlice";

export const UserCard = ({ firstname, lastname, username, _id }) => {
  const {
    currentUser: { following, _id: currentLoggedInUserId },
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const firstNameInitial = firstname[0];
  const lastNameInitial = lastname[0];
  const userInitials = `${firstNameInitial}${lastNameInitial}`;

  return (
    <Link
      to={`/profile/${username}`}
      className="flex items-center justify-between p-3 hover:bg-gray-50"
    >
      <span className="flex items-center">
        <span className="bg-blue-500 mr-4 text-white h-12 w-12 flex items-center justify-center rounded-full ">
          <span className="text-xl font-semibold">{userInitials}</span>
        </span>
        <span>
          <div className="font-bold">
            {firstname} {lastname}
          </div>
          <div className="text-sm text-gray-600">@{username}</div>
        </span>
      </span>
      <button
        className={`${
          !isUserPresent(following, _id)
            ? "border border-blue-400 text-primary hover:bg-blue-50"
            : "bg-primary text-white py-1"
        } font-semibold rounded-2xl px-4 py-1 `}
        onClick={() =>
          dispatch(
            followUnfollowUser({
              username: username,
              currentLoggedInUserId,
            })
          )
        }
      >
        {!isUserPresent(following, _id) ? "Follow" : "Following"}
      </button>
    </Link>
  );
};

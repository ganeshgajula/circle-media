import React, { useState } from "react";
import { CloseThickIcon } from "../../assets";
import { logout } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { resetPosts } from "../../features/posts/postSlice";

export const LogoutPopover = ({ setShowLogoutPopover }) => {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const firstNameInitial = currentUser?.firstname[0];
  const lastNameInitial = currentUser?.lastname[0];
  const userInitials = `${firstNameInitial}${lastNameInitial}`;

  const [isLinkBroken, setIsLinkBroken] = useState(false);

  return (
    <div className="fixed sm:bottom-28 md:bottom-28 lg:bottom-28 w-72 h-32 bg-white shadow-xl rounded-xl z-10">
      <div className="flex justify-between">
        <div className="flex items-center space-x-2 pl-4 py-3 w-full">
          {!currentUser?.avatar || isLinkBroken ? (
            <div className="h-12 w-12 bg-blue-500 text-white rounded-full flex items-center justify-center">
              <span className="text-xl font-medium">{userInitials}</span>
            </div>
          ) : (
            <img
              onError={() => setIsLinkBroken(true)}
              src={currentUser?.avatar}
              alt="avatar"
              className="object-cover rounded-full h-12 w-12"
            />
          )}
          <div>
            <h3 className="font-bold">{`${currentUser?.firstname} ${currentUser?.lastname}`}</h3>
            <p>@{currentUser?.username}</p>
          </div>
        </div>
        <div className="mr-4 mt-4" onClick={() => setShowLogoutPopover(false)}>
          <CloseThickIcon />
        </div>
      </div>
      <div
        className="pl-4 py-3 cursor-pointer hover:bg-gray-100 border-t border-gray-100"
        onClick={() => {
          dispatch(logout());
          dispatch(resetPosts());
        }}
      >
        Log out <span>@{currentUser?.username}</span>
      </div>
    </div>
  );
};

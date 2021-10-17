import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  CloseThinIcon,
  ProfileSmallIcon,
  BookmarkSmallIcon,
  LogoutIcon,
} from "../../assets";
import { logout } from "../../features/auth/authSlice";

export const SideDrawer = ({ setShowSideDrawer }) => {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const firstNameInitial = currentUser?.firstname[0];
  const lastNameInitial = currentUser?.lastname[0];
  const userInitials = `${firstNameInitial}${lastNameInitial}`;

  const [isLinkBroken, setIsLinkBroken] = useState(false);

  return (
    <div className="flex items-center justify-center fixed h-full w-full top-0 left-0 z-10 modal-bg">
      <div className="w-2/3 bg-white h-full fixed top-0 left-0">
        <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100">
          <span className="text-xl font-extrabold mr-12">Account Info</span>
          <CloseThinIcon setShowSideDrawer={setShowSideDrawer} />
        </div>
        <div
          className="px-4 py-3"
          onClick={() => {
            navigate(`/profile/${currentUser?.username}`);
            setShowSideDrawer(false);
          }}
        >
          {!currentUser?.avatar || isLinkBroken ? (
            <div className="h-10 w-10 bg-blue-500 text-white rounded-full flex items-center justify-center">
              <span className="text-lg font-bold">{userInitials}</span>
            </div>
          ) : (
            <img
              onError={() => setIsLinkBroken(true)}
              src={currentUser?.avatar}
              alt="avatar"
              className="object-cover rounded-full h-10 w-10"
            />
          )}
          <div className="mt-3 font-bold text-gray-900">
            {currentUser?.firstname} {currentUser?.lastname}
          </div>
          <p className="text-sm text-gray-500 font-medium">
            @{currentUser?.username}
          </p>
        </div>
        <div className="px-4 py-2 flex items-center">
          <span
            className="mr-6 flex space-x-1"
            onClick={() => {
              navigate(`/profile/${currentUser?.username}/following`);
              setShowSideDrawer(false);
            }}
          >
            <span className="font-bold">{currentUser?.following.length}</span>
            <span>Following</span>
          </span>
          <span
            className="flex space-x-1"
            onClick={() => {
              navigate(`/profile/${currentUser?.username}/followers`);
              setShowSideDrawer(false);
            }}
          >
            <span className="font-bold">{currentUser?.followers.length}</span>
            <span>Followers</span>
          </span>
        </div>
        <div className="flex flex-col">
          <div
            className="flex px-4 py-4 space-x-3"
            onClick={() => {
              navigate(`/profile/${currentUser?.username}`);
              setShowSideDrawer(false);
            }}
          >
            <ProfileSmallIcon />
            <span>Profile</span>
          </div>
          <div
            className="flex px-4 py-4 space-x-3"
            onClick={() => {
              navigate("/bookmarks");
              setShowSideDrawer(false);
            }}
          >
            <BookmarkSmallIcon />
            <span>Bookmarks</span>
          </div>
          <div
            className="flex px-4 py-4 space-x-3 cursor-pointer"
            onClick={() => {
              dispatch(logout());
            }}
          >
            <LogoutIcon />
            <span>Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

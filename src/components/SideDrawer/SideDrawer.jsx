import React from "react";
import { useSelector } from "react-redux";
import {
  CloseThinIcon,
  ProfileSmallIcon,
  BookmarkSmallIcon,
  LogoutIcon,
} from "../../assets";

export const SideDrawer = ({ setShowSideDrawer }) => {
  const user = useSelector((state) => state.users);

  let initials = "";

  user.users[0].name
    .split(" ")
    .map((word) => (initials += word[0].toUpperCase()));

  return (
    <div className="flex items-center justify-center fixed h-full w-full top-0 left-0 z-10 modal-bg">
      <div className="w-2/3 bg-white h-full fixed top-0 left-0">
        <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100">
          <span className="text-xl font-extrabold mr-12">Account Info</span>
          <CloseThinIcon setShowSideDrawer={setShowSideDrawer} />
        </div>
        <div className="px-4 py-3 ">
          <div className="h-10 w-10 bg-blue-500 text-white rounded-full flex items-center justify-center">
            <span className="text-lg font-bold">{initials}</span>
          </div>
          <div className="mt-3 font-bold text-gray-900">
            {user.users[0].name}
          </div>
          <p className="text-sm text-gray-500 font-medium">
            @{user.users[0].userName}
          </p>
        </div>
        <div className="px-4 py-2 flex items-center">
          <span className="mr-6 flex space-x-1">
            <span className="font-bold">20</span>
            <span>Following</span>
          </span>
          <span className="flex space-x-1">
            <span className="font-bold">50</span>
            <span>Followers</span>
          </span>
        </div>
        <div className="flex flex-col">
          <div className="flex px-4 py-4 space-x-3">
            <ProfileSmallIcon />
            <span>Profile</span>
          </div>
          <div className="flex px-4 py-4 space-x-3">
            <BookmarkSmallIcon />
            <span>Bookmarks</span>
          </div>
          <div className="flex px-4 py-4 space-x-3">
            <LogoutIcon />
            <span>Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

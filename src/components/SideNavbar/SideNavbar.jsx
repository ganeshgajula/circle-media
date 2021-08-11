import React, { useState } from "react";
import logo from "../../assets/logo.png";
import mobileLogo from "../../assets/mobile-logo.png";
import { Link } from "react-router-dom";
import {
  HomeIcon,
  NavSearchIcon,
  NotificationIcon,
  BookmarkIcon,
  ProfileIcon,
  MoreIcon,
} from "../../assets";
import { LogoutPopover } from "..";
import { useSelector } from "react-redux";

export const SideNavbar = () => {
  const [showLogoutPopover, setShowLogoutPopover] = useState(false);
  const {currentUser} = useSelector(state => state.auth);
  const firstNameInitial = currentUser?.firstname[0];
  const lastNameInitial = currentUser?.lastname[0];
  const userInitials = `${firstNameInitial}${lastNameInitial}`;

  return (
    <nav className="flex flex-col h-screen xl:w-17 px-3 py-3">
      <Link to="/">
        <img
          src={logo}
          alt="brand-logo"
          className="h-12 w-36 mb-3 hidden xl:block"
        />
        <img
          src={mobileLogo}
          alt="brand-logo"
          className="h-11 w-10 mb-3 mt-2 block xl:hidden"
        />
      </Link>
      <ul>
        <Link to="/">
          <li className="flex items-center px-3 py-3  cursor-pointer xl:hover:bg-blue-50 rounded-full primary-color nav-svg">
            <HomeIcon />
            <span className="ml-4 font-bold text-xl hidden xl:block">Home</span>
          </li>
        </Link>
        <Link to="/search">
          <li className="flex items-center px-3 py-3 lg:hidden cursor-pointer xl:hover:bg-blue-50 rounded-full primary-color nav-svg">
            <NavSearchIcon />
          </li>
        </Link>
        <Link to="/notifications">
          <li className="flex items-center px-3 py-3 cursor-pointer  xl:hover:bg-blue-50 rounded-full primary-color nav-svg">
            <NotificationIcon />
            <span className="ml-4 font-bold text-xl hidden xl:block">
              Notifications
            </span>
          </li>
        </Link>
        <Link to="/bookmarks">
          <li className="flex items-center px-3 py-3 cursor-pointer xl:hover:bg-blue-50 rounded-full primary-color nav-svg">
            <BookmarkIcon />
            <span className="ml-4 font-bold text-xl hidden xl:block">
              Bookmarks
            </span>
          </li>
        </Link>
        <Link to="/profile">
          <li className="flex items-center px-3 py-3 cursor-pointer xl:hover:bg-blue-50 rounded-full primary-color nav-svg">
            <ProfileIcon />
            <span className="ml-4 font-bold text-xl hidden xl:block">
              Profile
            </span>
          </li>
        </Link>
      </ul>
      {showLogoutPopover && (
        <LogoutPopover setShowLogoutPopover={setShowLogoutPopover} />
      )}
      <div className="fixed bottom-12">
        <div
          className="flex items-center px-3 py-3 cursor-pointer xl:hover:bg-blue-50 rounded-full"
          onClick={() => setShowLogoutPopover(true)}
          >
          <div className="h-12 w-12 mr-4 rounded-full bg-blue-500 text-white flex items-center justify-center">
            <span className="text-xl font-semibold">{userInitials}</span>
          </div>
          <span className="mr-6 space-y-0 hidden flex-col xl:flex">
            <p className="font-bold">{currentUser?.firstname} {currentUser?.lastname}</p>
            <p>@{currentUser?.username}</p>
          </span>
          <div className="hidden xl:block">
            <MoreIcon />
          </div>
        </div>
      </div>
    </nav>
  );
};

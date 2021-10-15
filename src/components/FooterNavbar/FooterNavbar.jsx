import React, { useState } from "react";
import { SideDrawer } from "..";
import { HomeIcon, NavSearchIcon, NotificationIcon } from "../../assets";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const FooterNavbar = () => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);

  const firstNameInitial = currentUser?.firstname[0];
  const lastNameInitial = currentUser?.lastname[0];
  const userInitials = `${firstNameInitial}${lastNameInitial}`;

  return (
    <>
      {showSideDrawer && <SideDrawer setShowSideDrawer={setShowSideDrawer} />}
      <ul className="flex items-center justify-between bg-white px-9 py-4 z-10">
        <Link to="/">
          <HomeIcon />
        </Link>
        <Link to="/search">
          <NavSearchIcon />
        </Link>
        <Link to="/notifications">
          <NotificationIcon />
        </Link>
        {!currentUser?.avatar ? (
          <div
            className="h-8 w-8 bg-blue-500 text-white flex items-center justify-center rounded-full"
            onClick={() => setShowSideDrawer(true)}
          >
            <span className="text-base font-medium">{userInitials}</span>
          </div>
        ) : (
          <img
            src={currentUser?.avatar}
            alt="avatar"
            onClick={() => setShowSideDrawer(true)}
            className="object-cover rounded-full h-8 w-8"
          />
        )}
      </ul>
    </>
  );
};

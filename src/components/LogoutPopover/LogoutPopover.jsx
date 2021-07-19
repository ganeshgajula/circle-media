import React from "react";
import { CloseThickIcon } from "../../assets";

export const LogoutPopover = ({ setShowLogoutPopover }) => {
  return (
    <div className="fixed sm:bottom-24 md:bottom-28 lg:bottom-24 w-72 h-32 bg-white shadow-xl rounded-xl z-10">
      <div className="flex justify-between">
        <div className="flex items-center space-x-2 pl-4 py-3 border-b border-gray-100">
          <div className="h-12 w-12 bg-blue-500 text-white rounded-full flex items-center justify-center">
            <span className="text-2xl font-medium">GG</span>
          </div>
          <div>
            <h3 className="font-bold">Ganesh Gajula</h3>
            <p>@ganeshgajula_</p>
          </div>
        </div>
        <div className="mr-4 mt-4" onClick={() => setShowLogoutPopover(false)}>
          <CloseThickIcon />
        </div>
      </div>
      <div
        className="pl-4 py-3 cursor-pointer hover:bg-gray-100"
        onClick={() => setShowLogoutPopover(false)}
      >
        Log out <span>@ganeshgajula_</span>
      </div>
    </div>
  );
};

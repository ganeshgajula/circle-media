import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { CloseMidThinIcon } from "../../assets";
import { editUserProfile } from "./usersSlice";

export const EditProfileModal = ({
  setShowEditProfileModal,
  userFirstName,
  userLastName,
  userBio,
  userLocation,
  userLink,
  username,
}) => {
  const [firstname, setFirstName] = useState(userFirstName);
  const [lastname, setLastName] = useState(userLastName);
  const [bio, setBio] = useState(userBio);
  const [location, setLocation] = useState(userLocation);
  const [link, setLink] = useState(userLink);
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-center fixed h-full w-full left-0 top-0 z-20 modal-bg">
      <div className="bg-white max-w-2xl m-auto box-border rounded-2xl h-2/4">
        <div className="flex items-center px-4 py-3 border-b border-gray-100">
          <span
            className="cursor-pointer"
            onClick={() => setShowEditProfileModal(false)}
          >
            <CloseMidThinIcon />
          </span>
          <span className="ml-6 font-bold text-lg">Edit Profile</span>
        </div>
        <div className="mt-4 px-4 py-3">
          <div className="flex space-x-3 items-center">
            <label htmlFor="firstname">Firstname</label>
            <input
              type="text"
              className="border border-gray-200 rounded-md p-1"
              maxLength="20"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label htmlFor="lastname">Lastname</label>
            <input
              type="text"
              className="border border-gray-200 rounded-md p-1"
              maxLength="20"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="flex flex-col  mt-6">
            <div className="flex items-center">
              <label htmlFor="bio">Bio</label>
              <textarea
                type="text"
                maxLength="160"
                className="border border-gray-200 rounded-md ml-4 w-full resize-none p-1"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
            </div>
            <div className="flex mt-6 items-center">
              <label htmlFor="Link">Link</label>
              <input
                type="text"
                className="border border-gray-200 rounded-md p-1 w-full ml-4"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>
            <div className="flex mt-6 items-center">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                className="border border-gray-200 rounded-md p-1 w-full ml-4"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-primary text-white max-w-max self-center px-4 py-1 rounded-md font-bold mt-8"
              onClick={() => {
                setShowEditProfileModal(false);
                dispatch(
                  editUserProfile({
                    username,
                    firstname,
                    lastname,
                    bio,
                    link,
                    location,
                  })
                );
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

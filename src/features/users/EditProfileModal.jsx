import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CameraIcon, CloseMidThinIcon, CloseThickIconMid } from "../../assets";
import { editUserProfile } from "./usersSlice";

export const EditProfileModal = ({ setShowEditProfileModal }) => {
  const { selectedUser } = useSelector((state) => state.users);

  const [avatar, setAvatar] = useState(selectedUser.avatar);
  const username = selectedUser.username;
  const [firstname, setFirstName] = useState(selectedUser.firstname);
  const [lastname, setLastName] = useState(selectedUser.lastname);
  const [bio, setBio] = useState(selectedUser.bio);
  const [location, setLocation] = useState(selectedUser.location);
  const [link, setLink] = useState(selectedUser.link);
  const dispatch = useDispatch();

  const [isLinkBroken, setIsLinkBroken] = useState(false);

  const firstNameInitial = firstname[0];
  const lastNameInitial = lastname[0];
  const userInitials = `${firstNameInitial}${lastNameInitial}`;

  useEffect(() => {
    if (selectedUser && !avatar) {
      setAvatar(
        `https://res.cloudinary.com/circler/image/twitter_name/c_fill,g_face,w_120,h_120,r_max/${username}.jpg`
      );
    }
  }, [avatar, selectedUser, username]);

  const updateProfileHandler = () => {
    let formData = new FormData();

    formData.append("avatar", avatar);
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("bio", bio);
    formData.append("link", link);
    formData.append("location", location);

    setShowEditProfileModal(false);

    dispatch(editUserProfile({ username, formData }));
  };

  console.log("AVA", avatar);

  return (
    <div className="flex items-center justify-center fixed h-full w-full left-0 top-0 z-20 modal-bg">
      <div className="bg-white max-w-2xl m-auto box-border rounded-2xl h-3/5 overflow-auto">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 sticky top-0 bg-white">
          <span className="flex items-center">
            <span
              className="cursor-pointer"
              onClick={() => setShowEditProfileModal(false)}
            >
              <CloseMidThinIcon />
            </span>
            <span className="ml-6 font-bold text-lg">Edit Profile</span>
          </span>

          <button
            type="submit"
            className="bg-primary text-white px-4 py-1 rounded-md font-bold"
            onClick={updateProfileHandler}
          >
            Save
          </button>
        </div>

        <div className="mt-4 px-4 py-3">
          <div className="flex items-center justify-between max-w-max">
            <label htmlFor="profile-image">
              {isLinkBroken ? (
                <div className="bg-blue-500 text-white h-20 w-20 rounded-full flex items-center justify-center">
                  <span className="text-3xl font-semibold">{userInitials}</span>
                </div>
              ) : (
                <div className="relative max-w-max">
                  <img
                    onError={() => setIsLinkBroken(true)}
                    src={selectedUser?.avatar ? selectedUser?.avatar : avatar}
                    alt="avatar"
                    className="object-cover rounded-full w-20 h-20 opacity-80"
                  />
                  <span className="absolute top-1/3 left-1/3">
                    <CameraIcon />
                  </span>
                </div>
              )}
              <input
                id="profile-image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setAvatar(e.target.files[0])}
              />
            </label>
            {avatar?.name && (
              <div
                className="flex items-center bg-gray-300 max-w-max p-1 rounded-md cursor-pointer ml-4"
                onClick={() => setAvatar(null)}
              >
                <CloseThickIconMid />
                <span>{avatar?.name}</span>
              </div>
            )}
          </div>

          <div className="flex space-x-3 mt-4 items-center">
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
          </div>
        </div>
      </div>
    </div>
  );
};

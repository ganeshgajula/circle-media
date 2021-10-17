import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { CalenderIcon, LeftArrow, LinkIcon, LocationIcon } from "../../assets";
import { isUserPresent } from "../../utils/utils";
import { PostCard } from "../posts/PostCard";
import { EditProfileModal } from "./EditProfileModal";
import { MonthAndYearInfo } from "./MonthAndYearInfo";
import { followUnfollowUser, getSelectedUser } from "./usersSlice";

import { Link } from "react-router-dom";

export const Profile = () => {
  const { username } = useParams();
  const {
    users,
    selectedUser,
    status: userStatus,
  } = useSelector((state) => state.users);
  const { status, posts } = useSelector((state) => state.feed);
  const { currentUser } = useSelector((state) => state.auth);
  const selectedUserPosts = posts.filter(
    ({ userId }) => userId.username === selectedUser?.username
  );
  const sortedUserPosts = selectedUserPosts
    ?.slice()
    .sort((a, b) => b.postDate.localeCompare(a.postDate));

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [isLinkBroken, setIsLinkBroken] = useState(false);

  const [avatar, setAvatar] = useState(selectedUser?.avatar);

  const firstNameInitial = selectedUser?.firstname[0];
  const lastNameInitial = selectedUser?.lastname[0];
  const userInitials = `${firstNameInitial}${lastNameInitial}`;

  useEffect(() => {
    if (users.length > 0 && userStatus === "fulfilled") {
      dispatch(getSelectedUser(username));
    }
  }, [dispatch, username, users, userStatus]);

  useEffect(() => {
    if (selectedUser && !avatar) {
      setAvatar(
        `https://res.cloudinary.com/circler/image/twitter_name/c_fill,g_face,w_120,h_120,r_max/${username}.jpg`
      );
    }
  }, [avatar, selectedUser, username]);

  console.log(users);
  console.log(username);
  console.log(selectedUser);
  console.log(selectedUser?.following);
  console.log(posts);
  console.log(selectedUserPosts);

  return (
    <div>
      <div className="flex items-center px-2 py-1 border-b border-gray-100 sticky top-0 w-full bg-white cursor-pointer">
        <span
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-blue-50 rounded-full"
        >
          <LeftArrow />
        </span>
        <span className="ml-6">
          <div className="text-xl font-bold ">
            {selectedUser?.firstname} {selectedUser?.lastname}
          </div>
          <small>{selectedUserPosts.length} Posts</small>
        </span>
      </div>
      <div className="p-3 ">
        <div className="flex items-center justify-between w-full">
          <div>
            {isLinkBroken ? (
              <div className="bg-blue-500 text-white h-20 w-20 rounded-full flex items-center justify-center">
                <span className="text-3xl font-semibold">{userInitials}</span>
              </div>
            ) : (
              <img
                onError={() => setIsLinkBroken(true)}
                src={selectedUser?.avatar ? selectedUser.avatar : avatar}
                alt="avatar"
                className="object-cover rounded-full h-20 w-20"
              />
            )}
            <div className="font-bold text-xl mt-1">
              {selectedUser?.firstname} {selectedUser?.lastname}
            </div>
            <div className="text-gray-500">@{selectedUser?.username}</div>
          </div>
          {selectedUser?._id === currentUser?._id ? (
            <div>
              <button
                className="hidden font-semibold border border-gray-300 rounded-full px-4 py-1 hover:bg-gray-100 sm:flex"
                onClick={() => setShowEditProfileModal(true)}
              >
                Edit Profile
              </button>
              <button
                className="font-semibold border border-gray-300 rounded-full px-4 py-1 hover:bg-gray-100 sm:hidden"
                onClick={() => navigate("/editprofile")}
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <button
              className={`${
                !isUserPresent(currentUser?.following, selectedUser?._id)
                  ? "border border-blue-400 text-primary  hover:bg-blue-50 "
                  : "bg-primary text-white py-1"
              } font-semibold rounded-2xl px-4 py-1`}
              onClick={() => {
                dispatch(
                  followUnfollowUser({
                    username: selectedUser?.username,
                    currentLoggedInUserId: currentUser?._id,
                  })
                );
              }}
            >
              {!isUserPresent(currentUser?.following, selectedUser?._id)
                ? "Follow"
                : "Following"}
            </button>
          )}
        </div>
        <p className="my-2">{selectedUser?.bio}</p>
        <div className="flex flex-col sm:flex-row sm:space-x-3">
          <span className="flex items-center space-x-1">
            <LocationIcon />
            <span>{selectedUser?.location}</span>
          </span>
          <span className="flex items-center space-x-1">
            <LinkIcon />
            <a
              href={`https://${selectedUser?.link}`}
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline"
            >
              {selectedUser?.link}
            </a>
          </span>
          <span className="flex items-center space-x-1">
            <CalenderIcon />
            <span>
              Joined <MonthAndYearInfo timestamp={selectedUser?.joinedOn} />
            </span>
          </span>
        </div>
        <div className="flex items-center my-2 space-x-5">
          <Link
            to={`/profile/${selectedUser?.username}/following`}
            className="text-sm hover:underline"
          >
            <span className="font-extrabold mr-1">
              {selectedUser?.following.length}
            </span>
            Following
          </Link>
          <Link
            to={`/profile/${selectedUser?.username}/followers`}
            className="text-sm hover:underline"
          >
            <span className="font-extrabold mr-1">
              {selectedUser?.followers.length}
            </span>
            Followers
          </Link>
        </div>
      </div>
      <div className="border-t border-gray-100 p-2">
        {sortedUserPosts?.length === 0 && status === "fulfilled" ? (
          <p>User doesn't have any posts.</p>
        ) : (
          sortedUserPosts?.map((post) => (
            <PostCard post={post} key={post._id} />
          ))
        )}
      </div>
      {showEditProfileModal && (
        <EditProfileModal setShowEditProfileModal={setShowEditProfileModal} />
      )}
    </div>
  );
};

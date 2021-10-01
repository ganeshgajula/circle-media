import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  NotifyFollowedIcon,
  NotifyLikeIcon,
  NotifyReplyIcon,
  NotifyRetweetIcon,
} from "../../assets";

export const Notifications = () => {
  const {
    currentUser: { notifications },
  } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const navigateBasedOnType = (type, username, postId) => {
    if (type === "Liked" || type === "Retweeted" || type === "Replied") {
      return navigate(`/posts/${postId}`);
    }
    return navigate(`/profile/${username}`);
  };

  const getUserInitials = (firstname, lastname) => {
    const firstNameInitial = firstname[0];
    const lastNameInitial = lastname[0];
    return `${firstNameInitial}${lastNameInitial}`;
  };

  return (
    <div>
      <div className="flex justify-between items-center px-3 py-3 border-b border-gray-100 sticky top-0 w-full bg-white cursor-pointer">
        <span className="text-xl font-extrabold">Notifications</span>
      </div>
      {notifications.length === 0 ? (
        <div className="py-3 px-4 text-center">
          <p className="font-bold text-xl mt-4">Nothing to see here -- yet</p>
          <p className="mt-4 text-gray-500">
            When someone mentions you, you'll find it here.
          </p>
        </div>
      ) : (
        notifications?.map(
          ({
            _id,
            originatorUserId: { firstname, lastname, username },
            type,
            postId,
          }) => (
            <ul key={_id}>
              <li
                className="py-2 px-4 cursor-pointer flex border-b hover:bg-gray-50"
                onClick={() => navigateBasedOnType(type, username, postId?._id)}
              >
                <div>
                  {type === "Followed" && <NotifyFollowedIcon />}
                  {type === "Liked" && <NotifyLikeIcon />}
                  {type === "Retweeted" && <NotifyRetweetIcon />}
                  {type === "Replied" && <NotifyReplyIcon />}
                </div>
                <div className="ml-4">
                  <div
                    className="flex items-center justify-center rounded-full bg-blue-500 text-white h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/profile/${username}`);
                    }}
                  >
                    <span className="text-md font-semibold">
                      {getUserInitials(firstname, lastname)}
                    </span>
                  </div>
                  <p className="mt-2">
                    <span
                      className="font-semibold mr-2 hover:underline"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/profile/${username}`);
                      }}
                    >
                      {firstname} {lastname}
                    </span>
                    {(type === "Liked" || type === "Retweeted") && (
                      <span>{type} your post</span>
                    )}
                    {type === "Replied" && <span>{type} to your post</span>}
                    {type === "Followed" && <span>{type} you</span>}
                  </p>
                </div>
              </li>
            </ul>
          )
        )
      )}
    </div>
  );
};

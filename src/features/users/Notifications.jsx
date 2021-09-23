import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

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

  return (
    <div>
      <div className="flex justify-between items-center px-3 py-3 border-b border-gray-100 sticky top-0 w-full bg-white cursor-pointer">
        <span className="text-xl font-extrabold">Notifications</span>
      </div>
      <h1>Inside Notifications</h1>
      {notifications.map(
        ({
          _id,
          originatorUserId: { firstname, lastname, username },
          type,
          postId: { _id: postID, content },
        }) => (
          <ul key={_id}>
            <li
              className="p-2 cursor-pointer"
              onClick={() => navigateBasedOnType(type, username, postID)}
            >
              <span>
                {type} by {firstname} {lastname}
              </span>
              <p>{content}</p>
            </li>
          </ul>
        )
      )}
    </div>
  );
};

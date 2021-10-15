import React, { useRef, useState } from "react";
import { UploadImageIcon, UploadEmojiIcon } from "../../assets";
import { createNewPost } from "./postSlice";
import { useDispatch, useSelector } from "react-redux";

export const NewPost = () => {
  const maxCharacterLimit = 280;
  const inputEl = useRef(null);
  const [postContent, setPostContent] = useState("");
  const [postMedia, setPostMedia] = useState(null);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const firstNameInitial = currentUser?.firstname[0];
  const lastNameInitial = currentUser?.lastname[0];
  const userInitials = `${firstNameInitial}${lastNameInitial}`;

  const newPostHandler = () => {
    let formData = new FormData();

    formData.append("postContent", postContent);
    formData.append("postMedia", postMedia);

    dispatch(createNewPost({ userId: currentUser._id, formData }));
    setPostContent("");
    setPostMedia(null);
  };

  return (
    <div>
      <div className="flex px-3 py-3 border-b border-gray-100">
        {!currentUser?.avatar ? (
          <div className="h-12 w-14 mr-4 rounded-full bg-blue-500 text-white flex items-center justify-center">
            <span className="text-xl font-semibold">{userInitials}</span>
          </div>
        ) : (
          <img
            src={currentUser?.avatar}
            alt="avatar"
            className="object-cover rounded-full h-12 w-14 mr-4"
          />
        )}
        <div className="flex flex-col w-full">
          <textarea
            type="text"
            value={postContent}
            ref={inputEl}
            style={{
              height: postContent
                ? `${inputEl?.current?.scrollHeight}px`
                : "50px",
            }}
            className="mt-1 mb-4 font-normal py-2 px-1 rounded-xl resize-none bg-transparent"
            placeholder="What's happenning ?"
            onChange={(e) => setPostContent(e.target.value)}
            maxLength="280"
          ></textarea>
          <div className="flex justify-between items-center pt-3 border-t border-gray-100">
            <div className="flex space-x-4">
              <label htmlFor="media-upload" className="flex">
                <UploadImageIcon />
                <input
                  id="media-upload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPostMedia(e.target.files[0])}
                  className="hidden"
                />
              </label>
              <span>
                <UploadEmojiIcon />
              </span>
            </div>
            <div className="flex items-center space-x-5">
              <div
                style={{
                  color: postContent.length >= maxCharacterLimit - 10 && "red",
                }}
                className="text-sm"
              >
                {postContent.length}/ {maxCharacterLimit}
              </div>
              <button
                className={
                  !postContent
                    ? "bg-blue-300 text-white text-lg font-bold px-4 py-1 rounded-full cursor-auto"
                    : "bg-primary text-white text-lg font-bold px-4 py-1 rounded-full "
                }
                onClick={newPostHandler}
                disabled={!postContent}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

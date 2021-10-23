import React, { useRef, useState } from "react";
import {
  UploadImageIcon,
  UploadEmojiIcon,
  CloseThickIconMid,
} from "../../assets";
import { createNewPost } from "./postSlice";
import { useDispatch, useSelector } from "react-redux";
import { emojis } from "../../data/emojis";
import { Spinner } from "../../components/Spinner/Spinner";

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
  const [isLinkBroken, setIsLinkBroken] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);

  const newPostHandler = () => {
    let formData = new FormData();

    formData.append("postContent", postContent);
    formData.append("postMedia", postMedia);

    dispatch(createNewPost({ userId: currentUser._id, formData }));
    setPostContent("");
    setPostMedia(null);
  };

  return (
    <div className="relative">
      <div className="flex px-3 py-3 border-b border-gray-100">
        {!currentUser?.avatar || isLinkBroken ? (
          <div
            className={`${
              !currentUser ? "bg-gray-50" : "bg-blue-500"
            } h-12 w-14 mr-3 sm:mr-4 rounded-full  text-white flex items-center justify-center`}
          >
            {!currentUser ? (
              <div className="flex items-center justify-center">
                <Spinner size={24} />
              </div>
            ) : (
              <span className="text-xl font-semibold">{userInitials}</span>
            )}
          </div>
        ) : (
          <img
            onError={() => setIsLinkBroken(true)}
            src={currentUser?.avatar}
            alt="avatar"
            className="object-cover rounded-full h-12 w-14 mr-3 sm:mr-4"
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
          {postMedia && (
            <div
              className="flex items-center bg-gray-300 max-w-max p-1 rounded-md mb-2 cursor-pointer"
              onClick={() => setPostMedia(null)}
            >
              <CloseThickIconMid />
              <span className="ml-1">{postMedia.name}</span>
            </div>
          )}
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
              <span onClick={() => setShowEmojis((prev) => !prev)}>
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
      {showEmojis && (
        <div className="absolute left-8 sm:left-1/4 max-w-4xl bg-white shadow-2xl grid grid-cols-8 gap-2 p-2 rounded-md">
          {emojis.map((emoji, index) => (
            <button
              key={index}
              className="text-2xl"
              onClick={() => setPostContent((content) => `${content}${emoji}`)}
            >
              {emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

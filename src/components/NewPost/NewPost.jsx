import React, { useRef, useState } from "react";
import { UploadImageIcon, UploadEmojiIcon } from "../../assets";
import { newPostCreated } from "../../features/posts/postSlice";
import { useDispatch } from "react-redux";

export const NewPost = () => {
  const maxCharacterLimit = 280;
  const inputEl = useRef(null);
  const [postContent, setPostContent] = useState("");

  const dispatch = useDispatch();

  return (
    <div>
      <div className="flex px-3 py-3 border-b border-gray-100">
        <div className="h-12 w-14 mr-4 rounded-full bg-blue-500 text-white flex items-center justify-center">
          <span className="text-2xl font-bold">GG</span>
        </div>
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
              <UploadImageIcon />
              <UploadEmojiIcon />
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
                className="bg-primary text-white text-lg font-bold px-4 py-1 rounded-full"
                onClick={() => dispatch(newPostCreated(postContent))}
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

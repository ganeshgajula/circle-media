import React, { useState, useRef } from "react";
import { createNewReply } from "./postSlice";
import { useDispatch, useSelector } from "react-redux";

export const NewReply = ({ postId }) => {
  const {
    currentUser: { _id, firstname, lastname },
  } = useSelector((state) => state.auth);
  const [replyContent, setReplyContent] = useState("");
  const inputEl = useRef(null);
  const dispatch = useDispatch();
  const maxCharacterLimit = 280;

  const firstNameInitial = firstname[0];
  const lastNameInitial = lastname[0];
  const userInitials = `${firstNameInitial}${lastNameInitial}`;

  return (
    <div className="flex pt-2">
      <div className="h-12 w-14 rounded-full bg-blue-500 text-white flex items-center justify-center mr-4">
        <span className="text-2xl font-semibold">{userInitials}</span>
      </div>
      <div className="flex flex-col w-full">
        <textarea
          type="text"
          value={replyContent}
          ref={inputEl}
          placeholder="Post your reply"
          maxLength="280"
          onChange={(e) => setReplyContent(e.target.value)}
          className="font-normal py-2 px-1 rounded-xl resize-none bg-transparent"
          style={{
            height: replyContent
              ? `${inputEl?.current?.scrollHeight}px`
              : "50px",
          }}
        ></textarea>
        <div className="flex justify-end items-center mt-3">
          <div
            className={`${
              replyContent.length >= maxCharacterLimit - 10 && "text-red-500"
            } text-sm`}
          >
            {replyContent.length}/ {maxCharacterLimit}
          </div>
          <button
            className={`${
              !replyContent
                ? "bg-blue-300 text-white text-lg font-bold px-4 py-1 rounded-full cursor-auto"
                : "bg-primary text-white text-lg font-bold px-4 py-1 rounded-full"
            } ml-4 text-xs`}
            onClick={() => {
              dispatch(
                createNewReply({
                  postAuthorId: _id,
                  postId,
                  content: replyContent,
                })
              );
              setReplyContent("");
            }}
          >
            Reply
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MoreIcon } from "../../assets";
import { updateReplyContent } from "./postSlice";
import { ReplyActionsPopOver } from "./ReplyActionsPopover";
import { TimeAgo } from "./TimeAgo";

export const PostReplies = ({
  replies,
  postAuthorId,
  postId,
  setShowDeleteReplyModal,
  setSelectedReplyMsg,
}) => {
  const [showReplyActions, setShowReplyActions] = useState(false);
  const [clickedMsgId, setClickedMsgId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const inputEl = useRef(null);
  const maxCharacterLimit = 280;
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isEditMode) {
      inputEl.current.focus();
    }
  }, [isEditMode]);

  const showReplyActionsHandler = (repliedMsgId, content) => {
    setShowReplyActions(true);
    setClickedMsgId(repliedMsgId);
    setReplyContent(content);
    setIsEditMode(false);
    setSelectedReplyMsg(repliedMsgId);
  };

  const modifyReplyContent = () => {
    setIsEditMode(false);
    dispatch(
      updateReplyContent({
        postAuthorId,
        postId,
        repliedMsgId: clickedMsgId,
        content: replyContent,
      })
    );
  };

  return replies.map(
    ({
      _id,
      content,
      date,
      replierId: { firstname, lastname, username, _id: userId },
    }) => {
      const firstNameInitial = firstname[0];
      const lastNameInitial = lastname[0];
      const userInitials = `${firstNameInitial}${lastNameInitial}`;

      return (
        <div key={_id} className="flex px-3 py-3 border-b border-gray-100">
          <div
            className={`${
              showReplyActions && clickedMsgId === _id && "mt-4"
            } h-10 w-12 bg-blue-500 text-white rounded-full flex items-center justify-center mr-4`}
          >
            <span className="text-lg font-semibold">{userInitials}</span>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex items-center justify-between">
              <span className="flex space-x-1 items-center">
                <span className="font-bold text-base hover:underline">
                  {firstname} {lastname}
                </span>
                <span className="gray-text">@{username}</span>
                <span>
                  · <TimeAgo timestamp={date} />
                </span>
              </span>
              {showReplyActions && clickedMsgId === _id && (
                <ReplyActionsPopOver
                  setShowReplyActions={setShowReplyActions}
                  setIsEditMode={setIsEditMode}
                  postAuthorId={postAuthorId}
                  repliedByUserId={userId}
                  setShowDeleteReplyModal={setShowDeleteReplyModal}
                />
              )}
              <span
                className={`${
                  showReplyActions && clickedMsgId === _id && "hidden"
                } ${isEditMode && clickedMsgId === _id && "hidden"} ${
                  currentUser._id !== userId &&
                  currentUser._id !== postAuthorId &&
                  "hidden"
                } mr-2 cursor-pointer`}
                onClick={() => showReplyActionsHandler(_id, content)}
              >
                <MoreIcon />
              </span>
            </div>
            {isEditMode && clickedMsgId === _id ? (
              <form onSubmit={modifyReplyContent}>
                <textarea
                  type="text"
                  ref={inputEl}
                  className="w-full p-1 mt-3 mb-1 resize-none bg-transparent"
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  style={{
                    height: replyContent
                      ? `${inputEl?.current?.scrollHeight}px`
                      : "50px",
                  }}
                  maxLength="280"
                ></textarea>
                <div className="flex items-center justify-end space-x-6">
                  <div
                    className={`${
                      replyContent.length >= maxCharacterLimit - 10 &&
                      "text-red-500"
                    } text-sm`}
                  >
                    {replyContent.length}/{maxCharacterLimit}
                  </div>
                  <button
                    type="submit"
                    className="border-2 border-blue-400 text-sm py-1 px-2 rounded-md"
                  >
                    Save
                  </button>
                  <button
                    className="bg-red-300 rounded-md py-1 px-2 text-sm"
                    onClick={() => {
                      setIsEditMode(false);
                      setReplyContent(content);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <article className="mb-1 text-base">{content}</article>
            )}
          </div>
        </div>
      );
    }
  );
};

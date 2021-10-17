import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
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
  setSelectedReplyMsgId,
  selectedReplyMsgId,
  setShowHideReplyModal,
}) => {
  const [showReplyActions, setShowReplyActions] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const inputEl = useRef(null);
  const maxCharacterLimit = 280;
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const [isLinkBroken, setIsLinkBroken] = useState(false);

  const activeReplies = replies.filter((reply) => reply.isActive);

  useEffect(() => {
    if (isEditMode) {
      inputEl.current.focus();
    }
  }, [isEditMode]);

  const showReplyActionsHandler = (repliedMsgId, content) => {
    setShowReplyActions(true);
    setSelectedReplyMsgId(repliedMsgId);
    setReplyContent(content);
    setIsEditMode(false);
  };

  const modifyReplyContent = () => {
    setIsEditMode(false);
    dispatch(
      updateReplyContent({
        postAuthorId,
        postId,
        repliedMsgId: selectedReplyMsgId,
        content: replyContent,
      })
    );
  };

  return activeReplies.map(
    ({
      _id,
      content,
      date,
      replierId: { avatar, firstname, lastname, username, _id: userId },
    }) => {
      const firstNameInitial = firstname[0];
      const lastNameInitial = lastname[0];
      const userInitials = `${firstNameInitial}${lastNameInitial}`;

      return (
        <div key={_id} className="flex px-3 py-3 border-b border-gray-100">
          {!avatar || isLinkBroken ? (
            <Link
              to={`/profile/${username}`}
              className={`${
                showReplyActions && selectedReplyMsgId === _id && "mt-4"
              } h-10 w-12 bg-blue-500 text-white rounded-full flex items-center justify-center mr-4`}
            >
              <span className="text-lg font-semibold">{userInitials}</span>
            </Link>
          ) : (
            <Link
              to={`/profile/${username}`}
              className={`${
                showReplyActions && selectedReplyMsgId === _id && "mt-4"
              }`}
            >
              <img
                onError={() => setIsLinkBroken(true)}
                src={avatar}
                alt="avatar"
                className="object-cover rounded-full h-10 w-12"
              />
            </Link>
          )}
          <div className="flex flex-col w-full">
            <div className="flex items-center justify-between">
              <Link
                to={`/profile/${username}`}
                className="flex space-x-1 items-center"
              >
                <span className="font-bold text-base hover:underline">
                  {firstname} {lastname}
                </span>
                <span className="gray-text">@{username}</span>
                <span>
                  · <TimeAgo timestamp={date} />
                </span>
              </Link>
              {showReplyActions && selectedReplyMsgId === _id && (
                <ReplyActionsPopOver
                  setShowReplyActions={setShowReplyActions}
                  setIsEditMode={setIsEditMode}
                  postAuthorId={postAuthorId}
                  repliedByUserId={userId}
                  setShowDeleteReplyModal={setShowDeleteReplyModal}
                  setShowHideReplyModal={setShowHideReplyModal}
                />
              )}
              <span
                className={`${
                  showReplyActions && selectedReplyMsgId === _id && "hidden"
                } ${isEditMode && selectedReplyMsgId === _id && "hidden"} ${
                  currentUser._id !== userId &&
                  currentUser._id !== postAuthorId &&
                  "hidden"
                } mr-2 cursor-pointer`}
                onClick={() => showReplyActionsHandler(_id, content)}
              >
                <MoreIcon />
              </span>
            </div>
            {isEditMode && selectedReplyMsgId === _id ? (
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

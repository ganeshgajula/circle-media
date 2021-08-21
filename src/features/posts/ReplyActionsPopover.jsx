import React from "react";
import { useSelector } from "react-redux";
import {
  CloseThickIconMinified,
  DeleteIconMinified,
  EditIconMinified,
  HideReplyIcon,
} from "../../assets";

export const ReplyActionsPopOver = ({
  setShowReplyActions,
  setIsEditMode,
  postAuthorId,
  repliedByUserId,
  setShowDeleteReplyModal,
}) => {
  const { currentUser } = useSelector((state) => state.auth);

  return (
    <div className="flex p-1 bg-white shadow-md">
      <span className="flex-col">
        <div
          className={`${
            postAuthorId !== repliedByUserId &&
            currentUser._id !== repliedByUserId &&
            "hidden"
          } flex items-center p-1 cursor-pointer`}
          onClick={() => {
            setIsEditMode(true);
            setShowReplyActions(false);
          }}
        >
          <EditIconMinified />
          <span className="ml-2 text-xs">Edit</span>
        </div>
        <div
          className={`${
            postAuthorId !== repliedByUserId &&
            currentUser._id !== repliedByUserId &&
            "hidden"
          } flex items-center p-1 cursor-pointer`}
          onClick={() => {
            setShowDeleteReplyModal(true);
            setShowReplyActions(false);
          }}
        >
          <DeleteIconMinified />
          <span className="ml-2 text-delete text-xs">Delete</span>
        </div>
        <div
          className={`${
            currentUser._id === repliedByUserId && "hidden"
          } flex items-center p-1 cursor-pointer`}
        >
          <HideReplyIcon />
          <span className="ml-2 text-xs">Hide reply</span>
        </div>
      </span>
      <span onClick={() => setShowReplyActions(false)}>
        <CloseThickIconMinified />
      </span>
    </div>
  );
};

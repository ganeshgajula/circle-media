import React from "react";
import {
  CloseThickIconMinified,
  DeleteIconMinified,
  EditIconMinified,
} from "../../assets";

export const ReplyActionsPopOver = ({ setShowReplyActions, setIsEditMode }) => {
  return (
    <div className="flex p-1 bg-white shadow-md">
      <span className="flex-col">
        <div
          className="flex items-center p-1 cursor-pointer"
          onClick={() => {
            setIsEditMode(true);
            setShowReplyActions(false);
          }}
        >
          <EditIconMinified />
          <span className="ml-2 text-xs">Edit</span>
        </div>
        <div className="flex items-center p-1 cursor-pointer">
          <DeleteIconMinified />
          <span className="ml-2 text-delete text-xs">Delete</span>
        </div>
      </span>
      <span onClick={() => setShowReplyActions(false)}>
        <CloseThickIconMinified />
      </span>
    </div>
  );
};

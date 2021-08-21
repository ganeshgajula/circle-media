import React from "react";
import { CloseThickIconMinified, DeleteIcon, EditIcon } from "../../assets";

export const PostActionsPopover = ({
  setShowPostActions,
  setIsEditMode,
  setShowDeletePostModal,
}) => {
  return (
    <div className="flex p-2 bg-white shadow-md">
      <span className="flex-col">
        <div
          className="flex items-center p-1 cursor-pointer"
          onClick={() => {
            setIsEditMode(true);
            setShowPostActions(false);
          }}
        >
          <EditIcon />
          <span className="ml-2">Edit</span>
        </div>
        <div
          className="flex items-center p-1 cursor-pointer"
          onClick={() => {
            setShowDeletePostModal(true);
            setShowPostActions(false);
          }}
        >
          <DeleteIcon />
          <span className="ml-2 text-delete">Delete</span>
        </div>
      </span>
      <span onClick={() => setShowPostActions(false)}>
        <CloseThickIconMinified />
      </span>
    </div>
  );
};

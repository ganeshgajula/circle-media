import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletePost } from "../../features/posts/postSlice";

export const DeletePostModal = ({ setShowDeletePostModal, postId }) => {
  const dispatch = useDispatch();
  const {
    currentUser: { _id },
  } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center fixed h-full w-full top-0 left-0 z-20 modal-bg">
      <div className="bg-white max-w-xs m-auto box-border p-7 rounded-2xl">
        <div>
          <div className="text-xl font-semibold mb-2">Delete Post?</div>
          <p className="text-sm text-gray-900">
            This can’t be undone and it will be removed from your profile & the
            timeline of any accounts that follow you.
          </p>
        </div>
        <div className="mt-5 flex flex-col">
          <button
            className="bg-delete text-white p-2 rounded-full font-semibold text-sm"
            onClick={() => {
              setShowDeletePostModal(false);
              dispatch(deletePost({ postAuthorId: _id, postId }));
              navigate("/", { replace: true });
            }}
          >
            Delete
          </button>
          <button
            className="border border-gray-300 mt-3 p-2 text-black rounded-full font-semibold text-sm"
            onClick={() => setShowDeletePostModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

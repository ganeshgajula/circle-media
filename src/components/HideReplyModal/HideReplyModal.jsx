import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideReply } from "../../features/posts/postSlice";

export const HideReplyModal = ({
  setShowHideReplyModal,
  selectedReplyMsgId,
  postId,
}) => {
  const {
    currentUser: { _id },
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-center fixed h-full w-full top-0 left-0 z-20 modal-bg">
      <div className="bg-white max-w-xs m-auto box-border p-7 rounded-2xl">
        <div>
          <div className="text-xl font-semibold mb-2">Hide Reply?</div>
          <p className="text-sm text-gray-900">
            This can’t be undone and it will be removed from this post and won't
            be visible to anyone.
          </p>
        </div>
        <div className="mt-5 flex flex-col">
          <button
            className="bg-delete text-white p-2 rounded-full font-semibold text-sm"
            onClick={() => {
              setShowHideReplyModal(false);
              dispatch(
                hideReply({
                  postAuthorId: _id,
                  postId,
                  repliedMsgId: selectedReplyMsgId,
                })
              );
            }}
          >
            Hide
          </button>
          <button
            className="border border-gray-300 mt-3 p-2 text-black rounded-full font-semibold text-sm"
            onClick={() => setShowHideReplyModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { isUserIdPresent } from "../../utils/utils";
import {
  ReplyIcon,
  RepostIcon,
  FilledRepostIcon,
  LikeIcon,
  FilledLikeIcon,
  AddToBookmarkIcon,
  FilledAddedToBookmarkIcon,
  UserRepostedIcon,
  MoreIcon,
} from "../../assets";
import {
  likeButtonPressed,
  retweetButtonPressed,
  bookmarkButtonPressed,
  updatePostContent,
} from "./postSlice";
import { TimeAndDateInfo } from "./TimeAndDateInfo";
import { NewReply } from "./NewReply";
import { PostReplies } from "./PostReplies";
import { PostActionsPopover } from "./PostActionsPopover";
import {
  DeletePostModal,
  DeleteReplyModal,
  HideReplyModal,
} from "../../components";

export const ExpandedPostCard = ({ post }) => {
  const {
    currentUser: { _id },
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [showPostActions, setShowPostActions] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [postContent, setPostContent] = useState(post.content);
  const [showDeletePostModal, setShowDeletePostModal] = useState(false);
  const [showDeleteReplyModal, setShowDeleteReplyModal] = useState(false);
  const [showHideReplyModal, setShowHideReplyModal] = useState(false);
  const [selectedReplyMsgId, setSelectedReplyMsgId] = useState(null);
  const inputEl = useRef(null);
  const maxCharacterLimit = 280;

  const firstNameInitial = post.userId.firstname[0];
  const lastNameInitial = post.userId.lastname[0];
  const userInitials = `${firstNameInitial}${lastNameInitial}`;

  const modifyPostContent = () => {
    setIsEditMode(false);
    dispatch(
      updatePostContent({
        postAuthorId: _id,
        postId: post._id,
        content: postContent,
      })
    );
  };

  useEffect(() => {
    if (isEditMode) {
      inputEl.current.focus();
    }
  }, [isEditMode]);

  return (
    <div>
      <div
        key={post._id}
        className="flex flex-col px-3 pt-3 pb-1 border-b border-gray-100"
      >
        <div
          className={`${
            !isUserIdPresent(post.retweetedBy, _id) && "hidden"
          } flex items-center space-x-2 pb-2 ml-8`}
        >
          <UserRepostedIcon />
          <span className="font-bold text-sm gray-text hover:underline">
            You Reposted
          </span>
        </div>
        <div className="flex justify-between">
          <span className="flex items-center">
            <Link
              to={`/profile/${post.userId.username}`}
              className="bg-blue-500 mr-3 text-white h-12 w-12 rounded-full flex items-center justify-center"
            >
              <span className="text-xl font-semibold">{userInitials}</span>
            </Link>
            <Link
              to={`/profile/${post.userId.username}`}
              className="flex flex-col"
            >
              <div className="font-bold text-base hover:underline">
                {post.userId.firstname} {post.userId.lastname}
              </div>
              <div className="gray-text">@{post.userId.username}</div>
            </Link>
          </span>
          {showPostActions && (
            <PostActionsPopover
              setShowPostActions={setShowPostActions}
              setIsEditMode={setIsEditMode}
              setShowDeletePostModal={setShowDeletePostModal}
              inputEl={inputEl}
            />
          )}
          <span
            className={`${showPostActions && "hidden"} ${
              post.userId._id !== _id && "hidden"
            } cursor-pointer pr-2`}
            onClick={() => setShowPostActions((current) => !current)}
          >
            <MoreIcon />
          </span>
        </div>
        {isEditMode ? (
          <form onSubmit={modifyPostContent}>
            <textarea
              type="text"
              ref={inputEl}
              className="w-full p-1 my-3 text-lg resize-none bg-transparent"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              style={{
                height: postContent
                  ? `${inputEl?.current?.scrollHeight}px`
                  : "50px",
              }}
              maxLength="280"
            ></textarea>
            <div className="flex items-center justify-end space-x-6">
              <div
                className={`${
                  postContent.length >= maxCharacterLimit - 10 && "text-red-500"
                }`}
              >
                {postContent.length}/{maxCharacterLimit}
              </div>
              <button
                type="submit"
                className="border-2 border-blue-400 py-1 px-2 rounded-md"
              >
                Save
              </button>
              <button
                className="bg-red-300 py-1 px-2 rounded-md"
                onClick={() => {
                  setPostContent(post.content);
                  setIsEditMode(false);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <article className="my-4 ml-1 text-xl font-medium">
            {post.content}
          </article>
        )}
        <TimeAndDateInfo timestamp={post.postDate} />
        <div className="flex items-center justify-between mr-4 sm:mr-7 md:mr-10 lg:mr-14 py-2">
          <button className="flex items-center cursor-pointer blue-color reply-svg">
            <span className="p-2 hover:bg-blue-100 rounded-full">
              <ReplyIcon />
            </span>
            <span className={post.replies.length > 0 ? "flex" : "hidden"}>
              {post.replies.length}
            </span>
          </button>
          <button
            className="flex items-center cursor-pointer green-color repost-svg"
            onClick={() =>
              dispatch(
                retweetButtonPressed({
                  postAuthorId: post.userId._id,
                  postId: post._id,
                  retweetedByUserId: _id,
                })
              )
            }
          >
            <span className="p-2 hover:bg-green-100 rounded-full">
              {!isUserIdPresent(post.retweetedBy, _id) ? (
                <RepostIcon />
              ) : (
                <FilledRepostIcon />
              )}
            </span>
            <span
              style={{
                display: post.retweetedBy.length < 1 && "none",
                color: !isUserIdPresent(post.retweetedBy, _id)
                  ? "inherit"
                  : "#17bf63",
              }}
            >
              {post.retweetedBy.length}
            </span>
          </button>
          <button
            className="flex items-center cursor-pointer red-color like-svg"
            onClick={() =>
              dispatch(
                likeButtonPressed({
                  postAuthorId: post.userId._id,
                  postId: post._id,
                  likedByUserId: _id,
                })
              )
            }
          >
            <span className="p-2 hover:bg-red-100 rounded-full">
              {!isUserIdPresent(post.likedBy, _id) ? (
                <LikeIcon />
              ) : (
                <FilledLikeIcon />
              )}
            </span>
            <span
              style={{
                display: post.likedBy.length < 1 && "none",
                color: !isUserIdPresent(post.likedBy, _id) ? "inherit" : "red",
              }}
            >
              {post.likedBy.length}
            </span>
          </button>
          <button
            className="flex cursor-pointer yellow-color bookmark-svg"
            onClick={() =>
              dispatch(
                bookmarkButtonPressed({
                  postAuthorId: post.userId._id,
                  postId: post._id,
                  bookmarkedByUserId: _id,
                })
              )
            }
          >
            <span className="p-2 hover:bg-yellow-100 rounded-full">
              {!isUserIdPresent(post.bookmarkedBy, _id) ? (
                <AddToBookmarkIcon />
              ) : (
                <FilledAddedToBookmarkIcon />
              )}
            </span>
          </button>
        </div>
        <div className="border-t border-gray-100 py-2">
          <p className="text-gray-500 ml-16">
            Replying to
            <span className="text-primary">@{post.userId.username}</span>
          </p>
          <NewReply postId={post._id} postAuthorId={post.userId._id} />
        </div>
      </div>
      <div className="h-3 bg-extra-light-gray"></div>
      <PostReplies
        replies={post.replies}
        postAuthorId={post.userId._id}
        postId={post._id}
        setShowDeleteReplyModal={setShowDeleteReplyModal}
        setSelectedReplyMsgId={setSelectedReplyMsgId}
        selectedReplyMsgId={selectedReplyMsgId}
        setShowHideReplyModal={setShowHideReplyModal}
      />
      {showDeletePostModal && (
        <DeletePostModal
          setShowDeletePostModal={setShowDeletePostModal}
          postId={post._id}
        />
      )}
      {showDeleteReplyModal && (
        <DeleteReplyModal
          setShowDeleteReplyModal={setShowDeleteReplyModal}
          selectedReplyMsgId={selectedReplyMsgId}
          postId={post._id}
        />
      )}
      {showHideReplyModal && (
        <HideReplyModal
          setShowHideReplyModal={setShowHideReplyModal}
          selectedReplyMsgId={selectedReplyMsgId}
          postId={post._id}
        />
      )}
    </div>
  );
};

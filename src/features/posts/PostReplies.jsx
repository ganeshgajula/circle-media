import React from "react";
import { TimeAgo } from "./TimeAgo";

export const PostReplies = ({ replies }) =>
  replies.map(({ id, userInitials, name, username, date, replyText }) => (
    <div key={id} className="flex px-3 py-3 border-b border-gray-100">
      <div className="h-12 w-14 bg-blue-500 text-white rounded-full flex items-center justify-center mr-4">
        <span className="text-2xl font-semibold">{userInitials}</span>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex space-x-1 items-center">
          <span className="font-bold text-base hover:underline">{name}</span>
          <span className="gray-text">@{username}</span>
          <span>
            · <TimeAgo timestamp={date} />
          </span>
        </div>
        <article className="mb-1 text-base">{replyText}</article>
      </div>
    </div>
  ));

import React from "react";
import { TimeAgo } from "./TimeAgo";

export const PostReplies = ({ replies }) =>
  replies.map(({ _id, content, date }) => {
    // const firstNameInitial = userId.firstname[0];
    // const lastNameInitial = lastname[0];
    // const userInitials = `${firstNameInitial}${lastNameInitial}`;

    return (
      <div key={_id} className="flex px-3 py-3 border-b border-gray-100">
        <div className="h-10 w-12 bg-blue-500 text-white rounded-full flex items-center justify-center mr-4">
          <span className="text-xl font-semibold">GG</span>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex space-x-1 items-center">
            <span className="font-bold text-base hover:underline">Ganesh</span>
            <span className="gray-text">@gajula</span>
            <span>
              · <TimeAgo timestamp={date} />
            </span>
          </div>
          <article className="mb-1 text-base">{content}</article>
        </div>
      </div>
    );
  });

import React from "react";
import { parseISO } from "date-fns";

export const TimeAndDateInfo = ({ timestamp }) => {
  let timeInfo = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    const timeString = date.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const dateString = date.toDateString();
    const monthAndDate = dateString.slice(4, 10);
    const year = dateString.slice(11);

    timeInfo = `${timeString} · ${monthAndDate}, ${year}`;
  }

  return (
    <span className="text-gray-500 pb-4 border-b border-gray-100">
      {timeInfo} · Circle Web App
    </span>
  );
};

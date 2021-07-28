import React from "react";
import { parseISO, formatDistanceToNowStrict } from "date-fns";

export const TimeAgo = ({ timestamp }) => {
  let timeAgo = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNowStrict(date);
    const timeArr = timePeriod.split(" ");
    let actualTime = timeArr[0];
    let unit = timeArr[1];
    timeAgo = `${actualTime}${unit[0]}`;
  }

  return <span>{timeAgo}</span>;
};

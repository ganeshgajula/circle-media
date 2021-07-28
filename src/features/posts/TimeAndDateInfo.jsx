import React from "react";
import { parseISO } from "date-fns";

export const TimeAndDateInfo = ({ timestamp }) => {
  let timeInfo = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    const dateArr = date.split(" ");
    console.log(dateArr);
  }

  return <span>{timeInfo}</span>;
};

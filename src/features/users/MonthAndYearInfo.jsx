import { parseISO } from "date-fns/esm";
import React from "react";

export const MonthAndYearInfo = ({ timestamp }) => {
  let monthAndYearInfo = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    const dateString = date.toDateString();
    const month = dateString.slice(4, 7);
    const year = dateString.slice(11);
    monthAndYearInfo = `${month} ${year}`;
  }

  console.log(monthAndYearInfo);
  return <span>{monthAndYearInfo}</span>;
};

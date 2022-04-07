import { Typography, Tabs, Tab } from "@mui/material";
import React, { useEffect, useState } from "react";
import moment from "moment";

function Calendar() {
  const today = moment();

  const startDay = today.clone().startOf("month");
  const endDay = today.clone().endOf("month");
  const days = startDay.clone().subtract(1, "day");
  const calendar = [];
  while (days.isBefore(endDay, "day")) {
    calendar.push(Array([]).map(() => days.add(1, "day").clone()));
  }

  const tomorrow = moment().add(1, "days");
  const yesterday = moment().subtract(1, "days");
  const [selectDate, setSelectDate] = useState(today);
  const [day, setDay] = useState("");
  useEffect(() => {
    if (selectDate.isSame(today, "day")) {
      setDay("Today");
    } else if (selectDate.isSame(yesterday, "day")) {
      setDay("Yesterday");
    } else if (selectDate.isSame(tomorrow, "day")) {
      setDay("Tomorrow");
      console.log("is same true");
    } else if (selectDate.isBefore(today, "days")) {
      setDay(moment(selectDate).fromNow());
      console.log("is before true");
    } else if (selectDate.isAfter(today, "days")) {
      setDay("In " + moment(today).to(selectDate, true));
      console.log("is after true");
    }
  }, [selectDate]);

  const [value, setValue] = useState(parseInt(today.format("D")) - 1);
  const handleDate = (e, newValue) => {
    e.preventDefault();
    setValue(newValue);
    setSelectDate(...calendar[newValue]);
  };

  return (
    <div className="cal-wrapper">
      <div className="cal-head">
        <Typography variant="subtitle1" color={"gray"}>
          {selectDate.format("dddd, MMM D")}
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          {day}
        </Typography>
      </div>

      <Tabs
        value={value}
        onChange={handleDate}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="wrapped scrollable auto tabs example"
      >
        {calendar.map((week) =>
          week.map((day) => {
            return (
              <Tab
                label={day.format("ddd D")}
                wrapped
                sx={{ width: "45px", minWidth: "40px", flex: 1, mx: "6px" }}
              />
            );
          })
        )}
      </Tabs>
    </div>
  );
}

export default Calendar;

import { Typography, Tabs, Tab } from "@mui/material";
import React, { useEffect, useState } from "react";
import moment from "moment";

function Calendar() {
  const today = moment();

  const month = today.format("dddd, MMMM D");
  const [selectDate, setSelectDate] = useState(today);

  const [value, setValue] = useState(parseInt(today.format("D")) - 1);
  const handleDate = (e, newValue) => {
    e.preventDefault();
    setValue(newValue);
    setSelectDate(...calendar[newValue]);
    console.log(newValue);
  };

  const startDay = today.clone().startOf("month");
  const endDay = today.clone().endOf("month");
  const day = startDay.clone().subtract(1, "day");
  const calendar = [];

  while (day.isBefore(endDay, "day")) {
    calendar.push(Array([]).map(() => day.add(1, "day").clone()));
  }

  return (
    <div className="cal-wrapper">
      <div className="cal-head">
        <Typography variant="subtitle1" color={"gray"}>
          {month}
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          {selectDate.format("D")}
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

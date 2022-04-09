import { Typography, Tabs, Tab, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import moment from "moment";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function Calendar() {
  const today = moment();

  

  const [value, setValue] = useState(parseInt(today.format("D")) - 1);
  const handleDate = (e, newValue) => {
    e.preventDefault();
    setValue(newValue);
    setSelectDate(...calendar[newValue]);
  };

  const [selectMonth, setSelectMonth] = useState(today.clone())
  const nextMonth=(e)=>{
    e.preventDefault()
    setSelectMonth(prevState=> prevState.clone().add(1, "month"))
  }
  const prevMonth=(e)=>{
    e.preventDefault()
    setSelectMonth(prevState=> prevState.clone().subtract(1, "month"))
  }

  const startDay = selectMonth.clone().startOf("month");
  const endDay = selectMonth.clone().endOf("month");
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
    } else if (selectDate.isBefore(today, "days")) {
      setDay(moment(selectDate).fromNow());
    } else if (selectDate.isAfter(today, "days")) {
      setDay("In " + moment(today).to(selectDate, true));
    }
    console.log(today.clone().add(2, "month"));
  }, [selectDate]);

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

      <div className="month-wrapper">
        <IconButton onClick={prevMonth}>
          <ChevronLeftIcon color="primary"></ChevronLeftIcon>
        </IconButton>
        <Typography sx={{width: 7/10, display: "flex" , justifyContent: "center",  }}>{selectMonth.format("MMMM")}</Typography>
        <IconButton onClick={nextMonth}>
          <ChevronRightIcon color="primary"></ChevronRightIcon>
        </IconButton>
        
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
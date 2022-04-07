import { Typography, Tabs, Tab } from '@mui/material'
import React, { useState } from 'react'
import moment from 'moment';

function Calendar() {
    const [date, setDate] = useState("1")
    const handleDate = (e, newValue) => {
        setDate(newValue)
    }
    const today = moment();
    const startDay = today.clone().startOf("month"); 
    const endDay = today.clone().endOf("month")
    const day = startDay.clone().subtract(1, "day")
    const calendar = []

    while(day.isBefore(endDay, "day")){
        calendar.push(
            Array(7).fill(0).map(()=> day.add(1, "day").clone())
        )
    }
    return (
        <div className='cal-wrapper'>
            <div className='cal-head'>
            <Typography variant='subtitle1' color={"gray"} >
                Thursday, April 7
            </Typography> 
            <Typography variant='h3' sx={{ fontWeight: 'bold' }}>Today</Typography>
            </div>
             
            <Tabs justified
                value={date}
                onChange={handleDate}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="wrapped scrollable auto tabs example"
            >
                
                <Tab label="sun 1" value="1" wrapped sx={{width: "45px", minWidth: "40px", flex: 1, mx: "6px"}}/>
                <Tab label="mon 2" value="2" wrapped sx={{width: "45px", minWidth: "40px", flex: 1, mx: "6px"}}/>
                <Tab label="tue 3" value="3" wrapped sx={{width: "45px",  minWidth: "40px", flex: 1, mx: "6px"}}/>
                <Tab label="wed 4" value="4" wrapped sx={{width: "45px", minWidth: "40px", flex: 1, mx: "6px"}}/>
                <Tab label="thu 5" value="5" wrapped sx={{width: "45px", minWidth: "40px", flex: 1, mx: "6px"}}/>
                <Tab label="fri 6" value="6" wrapped sx={{width: "45px",  minWidth: "40px", flex: 1, mx: "6px"}}/>
                <Tab label="sat 7" value="7" wrapped sx={{width: "45px",  minWidth: "40px", flex: 1, mx: "6px"}}/>
                <Tab label="thu 8" value="8" wrapped sx={{width: "45px", minWidth: "40px", flex: 1, mx: "6px"}}/>
                <Tab label="fri 9" value="9" wrapped sx={{width: "45px",  minWidth: "40px", flex: 1, mx: "6px"}}/>
                <Tab label="sat 10" value="10" wrapped sx={{width: "45px",  minWidth: "40px", flex: 1, mx: "6px"}}/>
                
            </Tabs>
        </div>
    )
}

export default Calendar
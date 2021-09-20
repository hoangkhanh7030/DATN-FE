import { Box, Paper, Tab, Tabs } from "@material-ui/core";
import { DURATION, PERCENTAGE } from "constants/index";
import React from "react";
import TabPanel from "./TabPanel";
import moment from "moment";
export default function CustomizedTab(props) {
  const {
    classes,
    tabValue = 0,
    percentage = 100,
    duration = 8,
    startDate = moment(),
    endDate = moment(),
    handleChangeTab,
    handleChangeTabInput,
    workDays = [],
  } = props;
  const countWorkingDayNum = (startDate, endDate, listWorkingDays) => {
    // total days between these day
    let DaysBetween =
      (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
    DaysBetween = DaysBetween - endDate.getDay() - (6 - startDate.getDay() + 1);

    let count = 0;
    for (let day of listWorkingDays) {
      day >= startDate.getDay() && count++;
      day <= endDate.getDay() && count++;
    }
    return count + Math.floor(DaysBetween / 7) * listWorkingDays.length;
  };
  const days =
    endDate.startOf("day").diff(startDate.startOf("day"), "days") + 1 > 1
      ? countWorkingDayNum(
          moment(startDate).toDate(),
          moment(endDate).toDate(),
          workDays
        )
      : endDate.startOf("day").diff(startDate.startOf("day"), "days") + 1;

  const tabs = [
    { tabType: PERCENTAGE, value: percentage },
    { tabType: DURATION, value: duration },
  ];

  return (
    <Box>
      <Paper elevation={0} className={classes.tabHeader}>
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          indicatorColor="primary"
          variant="fullWidth"
        >
          {tabs.map((tab, index) => (
            <Tab key={index} className={classes.tabTitle} label={tab.tabType} />
          ))}
        </Tabs>
      </Paper>
      <Paper elevation={0} className={classes.panelPaper}>
        {tabs.map((tab, index) => (
          <TabPanel
            key={index}
            value={tabValue}
            index={index}
            tabType={tab.tabType}
            handleChangeTabInput={handleChangeTabInput}
            days={days <= 0 ? 0 : days}
          >
            {tab.value}
          </TabPanel>
        ))}
      </Paper>
    </Box>
  );
}

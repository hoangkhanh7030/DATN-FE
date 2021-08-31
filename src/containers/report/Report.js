import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import * as _ from "underscore";

import { ThemeProvider, Box, Paper, Tabs, Tab } from "@material-ui/core";
import Project from "./Project";
import Resource from "./Resource";
import { DAY } from "constants/index";
import Toolbar from "./Toolbar";

import { useStyles } from "./style";
import { theme } from "assets/css/Common";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={4}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    "aria-controls": `wrapped-tabpanel-${index}`,
  };
}

export default function Report() {
  const [value, setValue] = useState(0);
  const [today, setToday] = useState(moment());
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());
  const [view, setView] = useState("week");

  const classes = useStyles();

  useEffect(() => {
    setStartDate(start());
    setEndDate(end());
  }, [today, view]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeDropdown = (e) => {
    setView(e.target.value);
  };

  function start() {
    const isWeek = view === "week" ? 1 : 0;
    return today.clone().startOf(view).add(isWeek, DAY);
  }
  function end() {
    const isWeek = view === "week" ? 1 : 0;
    return today.clone().endOf(view).add(isWeek, DAY);
  }

  return (
    <ThemeProvider theme={theme}>
      <Paper
        square
        elevation={0}
        className={`${classes.flexBasic} ${classes.header}`}
      >
        <Tabs value={value} indicatorColor="primary" onChange={handleChange}>
          <Tab label="Projects" {...a11yProps(0)} />
          <Tab label="Resources" {...a11yProps(1)} />
        </Tabs>

        <Toolbar
          view={view}
          startDate={startDate}
          endDate={endDate}
          handleChangeDropdown={handleChangeDropdown}
          today={today}
          setToday={setToday}
        />
      </Paper>

      <TabPanel value={value} index={0}>
        <Project />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Resource />
      </TabPanel>
    </ThemeProvider>
  );
}

import { Box, Paper, Tab, Tabs, ThemeProvider } from "@material-ui/core";
import { theme } from "assets/css/Common";
import { DAY } from "constants/index";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getReport, exportReport } from "redux/actions/reportAction";
import * as _ from "underscore";
import Project from "./Project";
import Resource from "./Resource";
import Chart from "./Chart";
import Statistics from "./Statistics";
import { useStyles } from "./style";
import Toolbar from "./Toolbar";
import { Message } from "components/common/Message";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  console.log("🚀 ~ file: Report.js ~ line 20 ~ TabPanel ~ children", children);

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
  console.log("🚀 ~ file: Report.js ~ line 42 ~ Report ~ Report");
  const [value, setValue] = useState(0);
  const [today, setToday] = useState(moment());
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());
  const [view, setView] = useState("week");
  const [type, setType] = useState("DAY");
  const classes = useStyles();

  const { id } = useParams();
  const dispatch = useDispatch();

  const [hasMessage, setOpenMessage] = useState(false);
  const { message } = useSelector((state) => state.message);
  const storeReport = useSelector((state) => state.reports);
  const [projectReport, setProjectReport] = useState([]);
  const [resourceReport, setResourceReport] = useState([]);

  const [overTime, setOverTime] = useState(0);
  const [trafficTime, setTrafficTime] = useState(0);
  const [allocatedTime, setAllocatedTime] = useState(0);

  useEffect(() => {
    setStartDate(start());
    setEndDate(end());
  }, [today, view]);
  const fetchReports = () => {
    const params = {
      startDate: startDate.format("YYYY-MM-DD"),
      endDate: endDate.format("YYYY-MM-DD"),
      type,
    };

    dispatch(getReport(id, params));
  };
  useEffect(() => {
    fetchReports();
  }, [dispatch, id, startDate, endDate, type]);

  useEffect(() => {
    if (!storeReport.data) {
      return;
    }
    console.log("here", _.get(storeReport, "data"));
    setProjectReport(
      _.get(storeReport, ["data", "projectReports", "projects"])
    );
    setResourceReport(
      _.get(storeReport, ["data", "resourceReports", "resources"])
    );
    setOverTime(_.get(storeReport, ["data", "overTime"]));
    setTrafficTime(_.get(storeReport, ["data", "trafficTime"]));
    setAllocatedTime(_.get(storeReport, ["data", "allocatedTime"]));
  }, [storeReport]);

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

  const handleCloseMessage = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenMessage(false);
  };

  const handleExport = () => {
    const params = {
      startDate: startDate.format("YYYY-MM-DD"),
      endDate: endDate.format("YYYY-MM-DD"),
      type: "DAY",
    };
    dispatch(exportReport(id, params))
      .then(() => setOpenMessage(true))
      .catch(() => setOpenMessage(true));
  };
  console.log("projectReport", projectReport);
  console.log("resourceReport", resourceReport);
  return (
    <ThemeProvider theme={theme}>
      <Paper square elevation={0} className={`${classes.header}`}>
        <Toolbar
          view={view}
          startDate={startDate}
          endDate={endDate}
          handleChangeDropdown={handleChangeDropdown}
          today={today}
          setToday={setToday}
          handleExport={handleExport}
          setType={setType}
          type={type}
        />
      </Paper>

      <Statistics
        trafficTime={trafficTime}
        allocatedTime={allocatedTime}
        overTime={overTime}
        type={type}
      />

      <Paper
        square
        elevation={0}
        className={classes.tab}
      >
        <Tabs value={value} indicatorColor="primary" onChange={handleChange}>
          <Tab label="Projects" {...a11yProps(0)} />
          <Tab label="Resources" {...a11yProps(1)} />
        </Tabs>
      </Paper>

      <TabPanel value={value} index={0}>
        {/* <Project /> */}
        <Chart reportData={projectReport} reportType="project" />
      </TabPanel>
      <TabPanel value={value} index={1}>
        {/* <Resource /> */}
        <Chart reportData={resourceReport} reportType="resource" />
      </TabPanel>
      {message ? (
        <Message
          message={message}
          isOpen={hasMessage}
          handleCloseMessage={handleCloseMessage}
          type={storeReport.status === 200 ? "success" : "error"}
        />
      ) : (
        <></>
      )}
    </ThemeProvider>
  );
}

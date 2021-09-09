import { Box, Grid, Paper, Tab, Tabs, ThemeProvider } from "@material-ui/core";
import { theme } from "assets/css/Common";
import { DAY } from "constants/index";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProjectReport } from "redux/actions/reportAction";
import * as _ from "underscore";
import Project from "./Project";
import Resource from "./Resource";
import Statistics from "./Statistics";
import { useStyles } from "./style";
import Toolbar from "./Toolbar";

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

export default function DetailStatistics() {
  const [value, setValue] = useState(0);

  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
 
  return (
      <Box>
        <Paper
        square
        elevation={0}
        className={`${classes.flexBasic} ${classes.header}`}
      >
        <Tabs value={value} indicatorColor="primary" onChange={handleChange}>
          <Tab label="Projects"  />
          <Tab label="Resources" />
        </Tabs>
      </Paper>
    

      <TabPanel value={value} index={0}>
        <Project data={{}} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Resource data={{}} />
      </TabPanel>
      </Box>
  );
}

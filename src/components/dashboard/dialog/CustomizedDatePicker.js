import MomentUtils from "@date-io/moment";
import { Paper, Typography } from "@material-ui/core";
import CalendarIcon from "@material-ui/icons/CalendarTodayOutlined";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { START_DATE, END_DATE } from "constants/index";
import React from "react";
import moment from "moment";
const DATE_FORMAT = "ddd, MMM DD";

export const CustomizedDatePicker = (props) => {
  const {
    classes,
    title = START_DATE,
    dateValue = moment(),
    startDate = moment(),
    handleDateChange,
  } = props;

  const inputProps = {
    disableUnderline: true,
    fontSize: 15,
    endAdornment: <CalendarIcon className={classes.calendarIcon} />,
  };

  return (
    <Paper className={classes.dialogPaper} elevation={0}>
      <Typography variant="h4" className={classes.commonTitle}>
        {title} <span className={classes.obligatedText}>*</span>
      </Typography>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DatePicker
          disableToolbar
          variant="inline"
          value={dateValue}
          onChange={handleDateChange}
          format={DATE_FORMAT}
          minDate={title === END_DATE ? startDate : undefined}
          helperText=""
          InputProps={inputProps}
        />
      </MuiPickersUtilsProvider>
    </Paper>
  );
};

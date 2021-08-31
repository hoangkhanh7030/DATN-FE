import { Box, Typography } from "@material-ui/core";
import CustomizedProgressBar from "./CustomizedProgressBar";
import { useStyles } from "./style";

export default function Statistics({ data = {} }) {
  const classes = useStyles();
  const calPercentage = (value) => {
    return Math.round((value * 100) / data.scheduledDays);
  };

  return (
    <Box className={classes.statistics}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="body1">Scheduled Days</Typography>
        <Typography variant="subtitle1" className={classes.days}>
          {data.scheduledDays} days
        </Typography>
      </Box>

      <CustomizedProgressBar
        title={"Working Days"}
        days={data.workingDays}
        percentage={calPercentage(data.workingDays)}
      />

      <CustomizedProgressBar
        title={"Overtime Days"}
        days={data.overtimeDays}
        percentage={calPercentage(data.overtimeDays)}
      />
    </Box>
  );
}

import { Box, Grid, LinearProgress, Typography } from "@material-ui/core";
import { useStyles } from "./style";

export default function CommonStatistic({
  data = {},
  type = "HOURS",
  allocatedTime = 0,
  totalAmount = 0,
}) {
  console.log(data);
  const classes = useStyles();

  return (
    <Box className={classes.statistics}>
      <Typography variant="h5" style={{ color: "#bdbdbd" }}>
        TODAY TRAFFIC ({type})
      </Typography>
      <Typography
        component="span"
        variant="subtitle1"
        className={classes.hours}
        style={{ fontSize: 32 }}
      >
        {allocatedTime.toLocaleString("de-DE")}{" "}
      </Typography>
      <Typography
        component="span"
        variant="body1"
        className={classes.hours}
        style={{ fontSize: 18 }}
      >
        / {totalAmount.toLocaleString("de-DE")}
      </Typography>
      <Grid container alignItems="center">
        <Grid item xs={2}>
          <Typography
            variant="body1"
            className={classes.hours}
            style={{ fontSize: 18 }}
          >
            {Math.round((allocatedTime * 100) / totalAmount) || 0}%
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <LinearProgress
            className={classes.progressBar}
            variant="determinate"
            value={Math.round((allocatedTime * 100) / totalAmount)}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

import { Box, LinearProgress, Typography } from "@material-ui/core";
import { useStyles } from "./style";

export default function CustomizedProgressBar({
  title = "",
  days = 0,
  percentage = 0,
}) {
  const classes = useStyles();

  return (
    <Box display="flex" alignItems="center" className={classes.progressBarBox}>
      <Box minWidth={35} className={classes.leftText}>
        <Typography variant="body2" color="textSecondary">
          {title}
        </Typography>
      </Box>
      <Box width="100%">
        <LinearProgress
          className={classes.progressBar}
          variant="determinate"
          value={percentage}
        />
      </Box>
      <Box minWidth={35} className={classes.rightText}>
        <Typography
          variant="body2"
          color="textSecondary"
        >{`${days} days (${Math.round(percentage)}%)`}</Typography>
      </Box>
    </Box>
  );
}

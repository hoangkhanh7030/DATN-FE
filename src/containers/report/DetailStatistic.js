import { Box, Typography } from "@material-ui/core";
import { useStyles } from "./style";

export default function DetailStatistic({ data = {}, type = "HOURS" }) {
  const classes = useStyles();

  return (
    <Box className={classes.statistics} style={{ paddingBottom: 51 }}>
      <Typography variant="h5" style={{ color: "#bdbdbd" }}>
        {data.title.toUpperCase()} ({type}S)
      </Typography>
      <Typography
        variant="subtitle1"
        className={classes.hours}
        style={{ fontWeight: "bold", fontSize: 32 }}
      >
        {data.amount.toLocaleString("de-DE")}
      </Typography>
    </Box>
  );
}

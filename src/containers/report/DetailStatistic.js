import { Box, Typography } from "@material-ui/core";
import { useStyles } from "./style";

export default function DetailStatistic({ data = {}, type = "HOURS" }) {
  console.log(data);
  const classes = useStyles();

  return (
    <Box className={classes.statistics} style={{paddingTop: 8,  paddingBottom: 67}}>
      <Typography variant="h5" style={{ color: "#bdbdbd" }}>
        {data.title.toUpperCase()} ({type})
      </Typography>
      <Typography
        variant="subtitle1"
        className={classes.hours}
        style={{ fontWeight: "bold", fontSize: 32 }}
      >
        {data.amount}
      </Typography>
    </Box>
  );
}

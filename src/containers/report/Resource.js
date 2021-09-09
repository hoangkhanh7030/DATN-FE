import { Grid } from "@material-ui/core";
import { useState } from "react";
import Statistics from "./Statistics";
export default function Resource() {
  const [data, setData] = useState({
    statistics: { scheduledDays: 255, workingDays: 240, overtimeDays: 15 },
  });

  return (
    <Grid container>
      <Grid item xs={3}>
        <Statistics data={data.statistics} />
      </Grid>
      <Grid item xs={9}></Grid>
    </Grid>
  );
}
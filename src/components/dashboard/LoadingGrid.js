import { Grid } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
const NUMS = [1, 2, 3, 4, 5, 6, 7, 8];

export default function LoadingGrid({ isOpen = false }) {
  return isOpen ? (
    <Grid container>
      {NUMS.map((row) =>
        NUMS.map((col) => (
          <Grid
            item
            key={col}
            style={{
              width: col === 1 ? "12%" : `calc((100% - 12%)/7)`,
              height: 50,
              border: "1px solid #E0E0E0",
              borderTop: "none",
              borderLeft:"none",
              paddingTop: 12,
              paddingLeft: 6,
            }}
          >
            <Skeleton style={{ width: "97%" }} />
          </Grid>
        ))
      )}
    </Grid>
  ) : null;
}

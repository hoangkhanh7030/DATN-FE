import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  title: {
    fontWeight: 600,
  },
  container: {
    justifyContent: "space-between",
  },
  newWorkspace: { fontWeight: 600 },
  paper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "170px",
  },
  addIcon: {
    fontSize: "50px",
    color: "#3870f5",
  },
});

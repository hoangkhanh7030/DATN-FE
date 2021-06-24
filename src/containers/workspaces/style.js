import { makeStyles } from "@material-ui/core/styles";
import * as colors from "../../assets/css/Common";

export const useStyles = makeStyles({
  container: {
    justifyContent: "space-between",
  },
  newWorkspace: { fontWeight: 600, marginTop: "10px" },
  paper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "170px",
  },
  addIcon: {
    fontSize: "50px",
    color: colors.primaryColor,
  },
});

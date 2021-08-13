import { makeStyles } from "@material-ui/core/styles";
import * as colors from "assets/css/Common";

export const useStyles = makeStyles({
  newWorkspace: { fontWeight: 600, marginTop: "10px" },
  paper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "170px",
    border: "1px solid #E0E0E0",
    "& .MuiIconButton-root":{
      padding: 0,
    }
  },
  addIcon: {
    fontSize: "50px",
    color: colors.primaryColor,
  },
  header: { marginBottom: "10px" },
});

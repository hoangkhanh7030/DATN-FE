import { makeStyles } from "@material-ui/core/styles";
import * as colors from "../../../assets/css/Common";

export const useStyles = makeStyles({
  root: {
    color: colors.blackColor,
    backgroundColor: colors.secondaryColor,
    "@media (max-width: 900px)": {
      paddingLeft: 0,
    },
  },
  logoApp: { display: "flex", alignItems: "center" },
  logo: {
    marginLeft: "5px",
    color: colors.blackColor,
    textAlign: "left",
  },
  menuButton: {
    fontWeight: 600,
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  popover: {
    marginTop: "10px",
  },
});

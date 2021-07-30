import { makeStyles } from "@material-ui/core/styles";
import * as colors from "assets/css/Common";

export const useStyles = makeStyles(() => ({
  paper: {
    padding: "0px 10px",
    marginTop: 15,
    border: `1px solid ${colors.borderColor}`,
  },

  invalidBorder: {
    border: `1px solid #F44336`,
  },

  colorBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },

  dialogActions: {
    background: colors.bgColor,
    borderTop: `1px solid ${colors.borderColor}`,
    padding: "20px 24px",
  },
}));

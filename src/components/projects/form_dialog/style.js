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
    margin: ({ dialogStyle }) => (dialogStyle ? "24px 0" : "15px 0 0 0"),
  },

  dialogActions: {
    background: colors.bgColor,
    borderTop: `1px solid ${colors.borderColor}`,
    padding: ({ dialogStyle }) => (dialogStyle ? "24px 24px" : "20px 24px"),
  },

  inputTitle: {
    display: "flex",
  },

  required: {
    color: "#D63B30",
    padding: 5,
  },
}));

import { makeStyles } from "@material-ui/core/styles";
import * as colors from "assets/css/Common";

export const useStyles = makeStyles((theme) => ({
  btnCircle: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    minWidth: theme.spacing(4),
    borderRadius: "50%",
  },
  workDays:{ margin: 12 },
  dialogActions: {
    background: colors.bgColor,
    borderTop: `1px solid ${colors.borderColor}`,
    padding: "12px 24px",
    "& .Mui-disabled": {
      backgroundColor: "#9BB7FA",
      color: colors.secondaryColor,
    },
  },
  paper: {
    padding: "0px 10px",
    marginTop: 15,
    border: `1px solid ${colors.borderColor}`,
  },
  invalidBorder: { border: `1px solid #F44336` },
  obligatedText: { color: "red" },
  chip:{
    margin: "4px 4px 8px 0px !important",
    height: 28
  }
}));

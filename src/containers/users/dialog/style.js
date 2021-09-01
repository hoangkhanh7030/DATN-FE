import { makeStyles } from "@material-ui/core/styles";
import * as colors from "assets/css/Common";

export const useStyles = makeStyles((theme) => ({
  dialogActions: {
    background: colors.bgColor,
    borderTop: `1px solid ${colors.borderColor}`,
    padding: "12px 24px",
    "& .Mui-disabled": {
      backgroundColor: "#9BB7FA",
      color: colors.secondaryColor,
    },
  },
  addBtn: {
    marginTop: 8,
    color: colors.primaryColor,
  },
  rowBox: {
    border: "1px solid rgba(0, 0, 0, 0.23)",
    width: "100%",
    margin: "4px 0",
    borderRadius: 4,
  },
  row: { position: "relative" },
  emailCol: { margin: "8px !important" },
  deleteBtn: { position: "absolute", right: 8, top: 4 },
  helperText: { marginLeft: 0 },
}));

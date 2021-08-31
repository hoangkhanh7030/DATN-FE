import { makeStyles } from "@material-ui/core/styles";
import * as colors from "assets/css/Common";

export const useStyles = makeStyles((theme) => ({
  flexBasic: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  header: {
    padding: "0px 20px",
  },

  moveIcon: {
    color: colors.primaryColor,
    fontSize: 16,
  },

  actionBox: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  todayButton: {
    fontSize: 12,
    padding: "7px 15px",
  },

  select: {
    "& .MuiTextField-root": {
      margin: 0,
      marginLeft: 10,
    },
    "& .MuiSelect-outlined": {
      fontSize: 14,
    },
  },
}));

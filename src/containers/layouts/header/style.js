import { makeStyles } from "@material-ui/core/styles";
import * as colors from "assets/css/Common";

export const useStyles = makeStyles((theme) => ({
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
    paddingLeft: "10px",
  },
  select: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  selectIcon: {
    marginRight: "10px",
  },
  newBtn: {
    margin: "10px 16px",
  },
  center: { textAlign: "center" },
  flex: { display: "flex" },
}));

export const MenuProps = {
  PaperProps: {
    style: {
      marginTop: "30px",
      minWidth: 220,
      maxWidth: 400,
    },
  },
};

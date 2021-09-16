import { makeStyles } from "@material-ui/core/styles";
import * as colors from "assets/css/Common";

export const useStyles = makeStyles((theme) => ({
  root: {
    color: `${colors.blackColor} !important`,
    backgroundColor: `${colors.secondaryColor} !important`,
    borderBottom: "1px solid #E0E0E0",
    "@media (max-width: 900px)": {
      paddingLeft: 0,
    },
    "@media (min-width: 600px)": {
      "& .MuiToolbar-regular": {
        minHeight: 56,
      },
      "& .MuiTab-root": {
        minWidth: 140,
        minHeight: 55,
        padding: 0,
      },
      "& .MuiTab-textColorInherit": {
        opacity: 0.5,
      },
      "& .MuiTab-textColorInherit.Mui-selected": {
        opacity: "1",
      },
    },
  },
  logoApp: { display: "flex", alignItems: "center" },
  logo: {
    marginLeft: "5px",
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
    maxWidth: 200,
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
  flex: { display: "flex", flex: 1 },
  tabs: {
    flex: 1,
  },
  avatar: {
    display: "flex",
    justifyContent: "flex-end",
    flex: 1,
  },
  checkIcon: {
    color: ({ checkColor }) => checkColor,
    marginRight: 4,
    position: "absolute",
  },
  resize: {
    color: colors.blackColor,
    fontSize: "18px",
    padding: 6,
  },
  headItem: {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    maxWidth: 180,
    marginLeft: 28,
  },
  selectedItem: {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
  flexGrid: {
    display: "flex",
  },
  selectedIcon: {
    display: "flex",
    position: "relative",
  },
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

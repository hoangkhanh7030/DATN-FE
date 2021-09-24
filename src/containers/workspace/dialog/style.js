import { makeStyles } from "@material-ui/core/styles";
import * as colors from "assets/css/Common";

export const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    padding: "10px 10px 0px",
    marginTop: 8,
    border: `1px solid ${colors.borderColor}`,
  },
  invalidBorder: {
    border: `1px solid #F44336`,
  },
  obligatedText: { color: "red" },
  commonTitle: {
    fontSize: 13,
    letterSpacing: "0.05em",
    marginTop: 0,
  },
  dialogActions: {
    background: colors.bgColor,
    borderTop: `1px solid ${colors.borderColor}`,
    padding: "12px 24px",
    "& .Mui-disabled": {
      backgroundColor: "#9BB7FA",
      color: colors.secondaryColor,
    },
  },
  selected: {
    "& .MuiListItem-root.Mui-selected": {
      backgroundColor: "rgb(255 0 0 / 8%)",
    },
    "& .MuiListItem-root.Mui-selected:hover": {
      backgroundColor: "rgb(255 0 0 / 8%)",
    },
  },

  // CustomizedSelect
  selectRoot: {
    minWidth: "unset",
    "&:focus": {
      backgroundColor: "white",
    },
  },
  searchNewItem: {
    margin: "4px 8px",
    width: "unset",
  },
  searchbar: {
    background: "#F5F5F5",
    border: `1px solid ${colors.borderColor}`,
    boxShadow: "none",
    height: "30px !important",
    // marginRight: "8px",
    minWidth: 282,
    "& .MuiIconButton-root": {
      width: "30px",
    },
  },
  emptyDataText: { color: "grey" },
  menuList: {
    maxHeight: 152,
    overflowY: "auto",
    "& .MuiListItem-gutters": {
      paddingRight: 4,
    },
  },

  // CustomizedDatePicker
  calendarIcon: {
    fontWeight: 300,
    color: "#2d2b2b",
    width: 20,
    position: "absolute",
    right: 6,
    bottom: 18,
  },
  errorText: { padding: "0 !important", marginLeft: 4 },
  dateError: {
    padding: "0 !important",
    marginBottom: 10,
  },

  // tab
  tabHeader: {
    border: "1px solid #e0e0e0",
    borderRadius: "5px 5px 0px 0px",
    borderBottom: "none",
    marginTop: 8,
  },
  tabTitle: {
    letterSpacing: "0.05em",
    fontWeight: 600,
  },
  panelPaper: {
    border: "1px solid #e0e0e0",
    borderRadius: " 0px 0px 5px 5px",
  },

  //tab panel
  utilization: {
    borderRadius: 8,
    border: "1px solid #e0e0e0",
    marginBottom: "none",
  },
  inputAdornment: {
    position: "absolute",
    top: 12,
    left: ({ leftInputAdornment }) => leftInputAdornment,
  },
  customizedInput: {
    width: ({ inputWidth }) => inputWidth,
    "& .MuiInputBase-input": {
      padding: 0,
      marginTop: 3,
      marginBottom: 2,
      fontSize: 16,
    },
  },
  hourTotal: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    border: "1px solid #e0e0e0",
  },

  // project item
  headItem: {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    maxWidth: 250,
    fontSize: 15,
  },
  circleIcon: {
    fontSize: 10,
    marginLeft: 16,
    marginRight: 16,
    color: ({ projectColor }) => projectColor,
    backgroundColor: ({ projectColor }) => projectColor,
    borderRadius: "50%",
    border: `1px solid ${colors.borderColor}`,
  },
  flexAlign: {
    display: "flex",
    alignItems: "center",
  },
  endItem: {
    textTransform: "uppercase",
    color: "#bdbdbd",
    marginRight: ({ marginRightText }) => marginRightText,
    fontSize: 13,
  },
  checkIcon: {
    color: ({ checkColor }) => checkColor,
  },

  // resource item
  small: {
    width: theme.spacing(3.5),
    height: theme.spacing(3.5),
    marginLeft: theme.spacing(1),
  },
  resourceText: {
    maxWidth: 300,
    fontSize: 15,
  },
}));

export const MenuProps = {
  PaperProps: {
    style: {
      marginTop: 45,
      minWidth: 396,
      left: 570,
    },
  },
};

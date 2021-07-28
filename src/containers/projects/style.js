import { withStyles, makeStyles } from "@material-ui/core/styles";
import { TableCell, TableRow } from "@material-ui/core";
import * as colors from "assets/css/Common";

export const StyledTableCell = withStyles((theme) => ({
  head: {
    fontWeight: "bold",
    fontSize: 16,
    borderRight: `1px solid ${colors.borderColor}`,
  },
  body: {
    borderRight: `1px solid ${colors.borderColor}`,
  },
}))(TableCell);

export const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "& .MuiTableCell-root": {
      padding: 13.5,
    },
  },
}))(TableRow);

export const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
    "& .MuiSelect-outlined": {
      fontSize: 14,
    },
  },

  pagination: {
    "& .Mui-selected": {
      backgroundColor: colors.blackColor,
      color: colors.secondaryColor,
    },
  },

  table: {
    minWidth: 700,
    "& .MuiIconButton-root": {
      color: colors.blackColor,
      padding: 6,
    },
  },

  boxTable: {
    borderLeft: `1px solid ${colors.borderColor}`,
  },

  tableTitleCenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  tableTitleIconCenter: {
    position: "absolute",
    right: 0,
  },

  tableTitleIcon: {
    fontSize: 14,
    color: colors.blackColor,
  },

  status: {
    minWidth: 150,
    height: 25,
  },

  active: {
    color: "#5586F6 !important",
    background: "#C3D4FC",
    border: "1px solid #5586F6",
  },

  inactive: {
    color: "#A9A9A9",
    background: "#E6E6E6",
    border: "1px solid #A9A9A9",
  },

  flex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  header: {
    borderRadius: "5px 5px 0px 0px",
  },

  searchbar: {
    background: "#F5F5F5",
    border: `1px solid ${colors.borderColor}`,
    boxShadow: "none",
    height: "38.5px !important",
    marginRight: "8px",
  },

  label: {
    fontSize: 14,
    paddingLeft: 20,
  },

  container: {
    background: colors.secondaryColor,
    padding: 20,
    border: `1px solid ${colors.borderColor}`,
  },

  footer: {
    borderRadius: "0px 0px 5px 5px",
    borderTop: 0,
  },

  button: {
    padding: "8px 20px",
  },

  color: {
    fontSize: 10,
    color: ({ projectColor }) => projectColor,
    border: `1px solid ${colors.borderColor}`,
    borderRadius: "50%",
  },
  midIcon: {
    padding: "0px 10px",
  },

  dropdown: {
    marginRight: 10,
  },
  emptyRows: {
    height: ({ emptyRows }) => emptyRows * 58,
  },
}));

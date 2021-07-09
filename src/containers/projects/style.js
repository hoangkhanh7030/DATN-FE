import { withStyles, makeStyles } from "@material-ui/core/styles";
import { TableCell, TableRow } from "@material-ui/core";

export const StyledTableCell = withStyles((theme) => ({
  head: {
    fontWeight: "bold",
    borderRight: "1px solid #E6E6E6",
    '&:last-child':{
      borderRight:0,
    }
  },
  body: {
    fontSize: 14,
    border: "1px solid #E6E6E6",
    '&:last-child':{
      borderRight:0,
    }
  },
}))(TableCell);

export const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "12ch",
    },
  },
  pagination: {
    "& .Mui-selected": {
      backgroundColor: "#000000",
      color: "#FFFFFF",
    },
  },

  table: {
    minWidth: 700,
  },

  active: {
    color: "#8BACFB",
    background: "#C3D4FC",
    minWidth: 150,
    height: 25,
    border: "0.1px solid #8BACFB",
  },

  inactive: {
    color: "#A9A9A9",
    background: "#E6E6E6",
    minWidth: 150,
    height: 25,
    border: "0.1px solid #A9A9A9",
  },

  flex: {
    display: "flex",
    alignItems: "center",
  },

  header: {
    justifyContent: "space-between",
    background: "#FFFFFF",
    padding: 20,
    borderRadius: "5px 5px 0px 0px",
    border: "1px solid #E6E6E6",
  },

  searchbar: {
    background: "#F5F5F5",
    border: "0.5px solid #E6E6E6",
    boxShadow: "none",
    height: "38.5px",
    marginRight: "8px",
  },

  label: {
    fontSize: "14px",
    paddingLeft: "20px",
  },

  footer: {
    justifyContent: "space-between",
    background: "#FFFFFF",
    padding: "20px",
    borderRadius: "0px 0px 5px 5px",
    border: "1px solid #E6E6E6",
    borderTop: 0,
  },
}));

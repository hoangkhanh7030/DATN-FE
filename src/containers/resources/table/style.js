import { TableCell, TableRow } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import * as colors from "assets/css/Common";

export const useStyles = makeStyles({
  root: {
    "& .MuiIconButton-root": {
      color: colors.blackColor,
    },
    borderLeft: `1px solid ${colors.borderColor}`,
    borderRadius: 0,
  },
  table: { minWidth: 750 },
  avatar: {
    margin: "auto",
    border: `1px solid ${colors.borderColor}`,
  },
  flex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sortIcon: {
    height: 16,
    width: 16,
  },
  headRoot: {
    "& .MuiIconButton-root": {
      fontSize: 16,
    },
    "& .MuiTypography-root": {
      fontSize: 16,
      fontWeight: "bold",
    },
  },
  titleCenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  rightSortIcon: {
    position: "absolute",
    right: 0,
    height: 16,
    width: 16,
  },
  emptyRows: {
    height: ({ emptyRows }) => emptyRows * 59,
  },
  status: {
    minWidth: 150,
    height: 25,
  },
  active: {
    color: "#5586F6",
    background: "#C3D4FC",
    border: "1px solid #5586F6",
  },
  inactive: {
    color: "#A9A9A9",
    background: "#E6E6E6",
    border: "1px solid #A9A9A9",
  },
});

export const useToolbarStyles = makeStyles({
  root: {
    background: colors.secondaryColor,
    border: `1px solid ${colors.borderColor}`,
    borderRadius: "5px 5px 0px 0px",
    justifyContent: "space-between",
  },
  leftToolbar: {
    display: "flex",
    maxHeight: 36,
    alignItems: "center",
  },
  moreBtn: {
    backgroundColor: colors.secondaryColor,
    marginRight: 10,
  },
  searchbar: {
    background: colors.bgColor,
    border: `1px solid ${colors.borderColor}`,
    boxShadow: "none",
    height: "36px !important",
  },
  input: {
    height: 26,
    padding: "5px 15px",
    display: "flex",
    alignItems: "center",
    fontSize: 14,
  },
  selectInput: { margin: "0 10px" },
});

export const useFooterStyles = makeStyles({
  root: {
    justifyContent: "space-between",
    background: colors.secondaryColor,
    padding: 20,
    borderRadius: "0px 0px 5px 5px",
    display: "flex",
    alignItems: "center",
    border: `1px solid ${colors.borderColor}`,
    borderTop: "none",
  },
  flex: {
    display: "flex",
    alignItems: "center",
  },
  pagination: {
    "& .Mui-selected": {
      backgroundColor: `${colors.blackColor} ! important`,
      color: colors.secondaryColor,
    },
  },
  input: {
    height: 26,
    padding: "5px 15px",
    display: "flex",
    alignItems: "center",
    fontSize: 14,
  },
  selectInput: { margin: "0 5px" },
});

export const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "& .MuiTableCell-root": {
      padding: "8px 16px",
    },
    "& .MuiIconButton-root": {
      color: colors.blackColor,
      padding: 8,
      fontSize: 18,
    },
  },
}))(TableRow);

export const StyledTableCell = withStyles({
  head: {
    fontWeight: "bold",
    fontSize: 16,
    borderRight: `1px solid ${colors.borderColor}`,
  },
  body: { borderRight: `1px solid ${colors.borderColor}` },
})(TableCell);

export const MenuProps = {
  PaperProps: {
    style: {
      boxShadow: "0 1px 5px 1px rgb(0 0 0 / 20%)",
    },
  },
};

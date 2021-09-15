import { makeStyles } from "@material-ui/core/styles";
import * as colors from "assets/css/Common";

export const useStyles = makeStyles({
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
    marginTop: 15,
  },

  dialogActions: {
    background: colors.bgColor,
    borderTop: `1px solid ${colors.borderColor}`,
    padding: "20px 24px",
  },
  selectInput: {
    width: "70%",
  },
  selectRoot: {
    "&:focus": {
      backgroundColor: "white",
    },
  },
  obligatedText: { color: "red" },
  text: { paddingBottom: "6px", paddingTop: "2px", color: "#A2A2A2B5" },

  settingsContent: {
    minHeight: 400,
  },
  alignCenter: {
    display: "flex",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 12,
  },

  chip: {
    // cursor: "text",
    margin: 4,
  },
  customizedChip: {
    border: "none",
    background: "#e0e0e0",
    borderRadius: 16,
    padding: `0 !important`,
    paddingLeft: `12px !important`,
    height: `32px !important`,
    outline: 0,
    fontSize: "0.8125rem",
    color: "rgba(0,0,0,0.87)",
  },

  chipContainer: {
    minHeight: `56px !important`,
    marginBottom: 0,
    overflowX: "auto",
  },
  root: {
    minHeight: `56px !important`,
  },
  inputRoot: {
    paddingTop: `0 !important`,
    flexWrap: "nowrap !important",
    minWidth: "unset !important",
  },
  input: {
    marginTop: `0 !important`,
    paddingTop: `0 !important`,
    marginBottom: `0 !important`,
    paddingBottom: `0 !important`,
    minWidth: `100px !important`,
  },
  helperText: {
    marginBottom: `-20px !important`,
  },
});

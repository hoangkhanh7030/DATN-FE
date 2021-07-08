import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  root: {
    height: "170px",
    cursor: "pointer",
  },
  subheader: {
    listStyleType: "none",
    padding: 0,
    fontSize: "14px",
  },
  grow: {
    transformOrigin: "left top",
  },
  icon: {
    fontSize: "16px",
  },
  overflowWithDots: {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    width: "200px",
  },
});

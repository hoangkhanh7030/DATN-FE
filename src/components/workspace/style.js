import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  root: {
    height: "170px",
    cursor: "pointer",
    border: "1px solid #E0E0E0",
  },
  cardHeader: {
    paddingBottom: 0,
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: 0,
    "&:last-child": {
      paddingBottom: 0,
    },
  },
  hours: {
    textAlign: "center",
  },
  hoursText: {
    fontSize: "13px",
  },
  subheader: {
    listStyleType: "none",
    padding: 0,
    margin: "5px 0",
    fontSize: "13px",
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

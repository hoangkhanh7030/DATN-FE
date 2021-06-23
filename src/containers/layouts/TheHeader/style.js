import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  header: {
    color: "black",
    backgroundColor: "white",
    "@media (max-width: 900px)": {
      paddingLeft: 0,
    },
  },
  logo: {
    color: "black",
    fontWeight: 600,
    textAlign: "left",
  },
  menuButton: {
    fontWeight: 600,
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
});

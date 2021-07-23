import { Backdrop, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#3870f5",
    background: "none",

    width: "4.7%",
    height: "10%",
    left: "47.5%",
    top: "43%",
    right: "auto",
    bottom: "auto",
  },
}));

export const Progress = ({ isOpen }) => {
  const classes = useStyles();
  return (
    <Backdrop open={isOpen} className={classes.backdrop}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

import Snackbar from "@material-ui/core/Snackbar";
import { Alert, AlertTitle } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import * as colors from "assets/css/Common";

export const useStyles = makeStyles({
  text: {
    color: "white",
    marginTop: 50,
  },
  success: {
    background: colors.primaryColor,
  },
  error: {
    background: colors.ggColor,
  },
});

export const Message = ({
  message,
  isOpen,
  handleCloseMessage,
  type = "success",
}) => {
  const classes = useStyles();
  const status = type === "success" ? classes.success : classes.error;
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={3000}
      onClose={handleCloseMessage}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Alert
        variant="filled"
        severity="success"
        onClose={handleCloseMessage}
        className={`${classes.text} ${status}`}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

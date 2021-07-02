import Snackbar from "@material-ui/core/Snackbar";
import { Alert } from "@material-ui/lab";

export const Message = ({ message, isOpen, handleCloseMessage, type }) => {
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={3000}
      onClose={handleCloseMessage}
    >
      <Alert onClose={handleCloseMessage} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  );
};

import { Button } from "@material-ui/core";

import { commonStyle } from "assets/css/Common";
import loginStyle from "./style";

export const GoogleButton = ({ onClick, isLoading, isLoginGG }) => {
  const classes = loginStyle();
  const commonClasses = commonStyle();
  return (
    <Button
      fullWidth
      variant="contained"
      onClick={onClick}
      className={classes.google}
      disableElevation
    >
      {isLoading && isLoginGG ? (
        ""
      ) : (
        <>
          <i className={`${commonClasses.ggicon} + fab fa-google`}></i>
          Login with Google
        </>
      )}
    </Button>
  );
};

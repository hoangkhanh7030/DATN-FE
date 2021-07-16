import { Button } from "@material-ui/core";

import { commonStyle,  } from "assets/css/Common";
import loginStyle from "./style";

export const GoogleButton = ({onClick,disabled}) => {
  const classes = loginStyle();
  const commonClasses = commonStyle();
  return (
    <Button
      fullWidth
      variant="contained"
      onClick={onClick}
      className={classes.google}
      color="secondary"
    >
      <i className={`${commonClasses.ggicon} + fab fa-google`}></i>
      Login with Google
    </Button>
  );
};

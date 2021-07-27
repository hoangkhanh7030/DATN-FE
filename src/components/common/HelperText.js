import { Typography } from "@material-ui/core";
import { commonStyle } from "assets/css/Common";

export const HelperText = ({ errorValue, errorName }) => {
  const commonClasses = commonStyle();
  return (
    <Typography
      className={commonClasses.helperText}
      style={{
        display: errorName === errorValue ? "block" : "none",
      }}
    >
      This field is required !
    </Typography>
  );
};

import { Typography } from "@material-ui/core";
import { commonStyle } from "assets/css/Common";

export const HelperText = ({
  errorValue,
  errorName,
  message = "This field is required !",
}) => {
  const commonClasses = commonStyle();
  return (
    <Typography
      className={commonClasses.helperText}
      style={{
        display: errorName === errorValue ? "block" : "none",
      }}
    >
      {message}
    </Typography>
  );
};

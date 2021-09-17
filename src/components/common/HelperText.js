import { Typography } from "@material-ui/core";
import { commonStyle } from "assets/css/Common";

export const HelperText = ({
  dateError,
  errorValue,
  errorName,
  message = "this field is required !",
  type = "",
}) => {
  const commonClasses = commonStyle();
  return (
    <Typography
      className={`${commonClasses.helperText} ${dateError}`}
      style={{
        display: errorName === errorValue || type ? "block" : "none",
      }}
    >
      {message}
    </Typography>
  );
};

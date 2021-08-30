import React from "react";
import { Typography, InputBase, Paper } from "@material-ui/core";

import { useStyles } from "./style";
import { HelperText } from "components/common/HelperText";

export const DialogInput = ({
  title = "",
  inputName = "",
  inputValue = "",
  handleTextChange,
  errMsg,
}) => {
  const classes = useStyles();
  return (
    <>
      <Paper
        className={`${classes.paper} ${errMsg ? classes.invalidBorder : null}`}
        elevation={0}
      >
        <Typography variant="h4">
          {title}{" "}
          {title === "Name" ? (
            <span className={classes.obligatedText}>*</span>
          ) : (
            <></>
          )}
        </Typography>
        <InputBase
          name={inputName}
          defaultValue={inputValue}
          margin="dense"
          placeholder={title.toLowerCase()}
          onChange={handleTextChange}
          fullWidth
          autoComplete="off"
        />
      </Paper>
      <HelperText
        message={errMsg}
        type={errMsg ? "type" : ""}
      />
    </>
  );
};

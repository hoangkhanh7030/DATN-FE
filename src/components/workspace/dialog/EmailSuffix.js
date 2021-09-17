import React from "react";
import { Typography, Paper } from "@material-ui/core";
import ChipInput from "material-ui-chip-input";
import { useStyles } from "./style";
import { HelperText } from "components/common/HelperText";

export const EmailSuffix = ({
  emailSuffixes = [],
  handleAddChip,
  handleDeleteChip,
  handleUpdateInput,
  errMsg = "",
}) => {
  const classes = useStyles();
  return (
    <>
      <Paper
        className={`${classes.paper} ${errMsg ? classes.invalidBorder : null}`}
        elevation={0}
      >
        <Typography variant="h4">
          Email Suffix <span className={classes.obligatedText}>*</span>
        </Typography>
        <ChipInput
          value={emailSuffixes}
          classes={{ chip: classes.chip }}
          onAdd={(chip) => handleAddChip(chip)}
          onDelete={(chip, id) => handleDeleteChip(chip, id)}
          onUpdateInput={handleUpdateInput}
          placeholder={"email suffix"}
          alwaysShowPlaceholder
          disableUnderline
          fullWidth
          blurBehavior="add"
        />
      </Paper>
      <HelperText message={errMsg} />
    </>
  );
};

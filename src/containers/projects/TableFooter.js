import React from "react";

import {
  TextField,
  MenuItem,
  FormControl,
  Typography,
  Box,
} from "@material-ui/core";

import Pagination from "@material-ui/lab/Pagination";

import { useStyles } from "./style";
import { INITIAL_PAGE, INITIAL_ROWS_PER_PAGE, SIZES } from "constants/index";
export default function ProjectsFooter({
  rowsPerPage = INITIAL_ROWS_PER_PAGE,
  numPage = INITIAL_PAGE,
  page = INITIAL_PAGE,
  handleChangePage,
  handleChangeDropdown,
}) {
  const classes = useStyles();

  return (
    <Box className={`${classes.container} ${classes.footer} ${classes.flex}`}>
      <Box className={classes.flex}>
        <Typography> SHOW </Typography>
        <FormControl className={classes.root} noValidate autoComplete="off">
          <TextField
            select
            value={rowsPerPage}
            name={"size"}
            onChange={handleChangeDropdown}
            variant="outlined"
            margin="dense"
          >
            {SIZES.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
        <Typography> ITEMS </Typography>
      </Box>

      <Box>
        <Pagination
          count={numPage}
          variant="outlined"
          className={classes.pagination}
          shape="rounded"
          page={page}
          onChange={handleChangePage}
        />
      </Box>
    </Box>
  );
}

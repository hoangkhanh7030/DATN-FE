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

const sizes = [
  { label: 5, value: 5 },
  { label: 10, value: 10 },
  { label: 15, value: 15 },
];

export default function Projects({
  rowsPerPage = 5,
  numPage = 1,
  page = 1,
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
            {sizes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
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

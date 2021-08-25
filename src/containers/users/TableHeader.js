import React from "react";
import SearchBar from "material-ui-search-bar";
import { Box } from "@material-ui/core";
import { useStyles } from "containers/projects/style";

export default function TableHeader({ searched, cancelSearch, keyUp }) {
  const classes = useStyles();
  return (
    <Box className={`${classes.container} ${classes.header} ${classes.flex}`}>
      <SearchBar
        value={searched}
        className={classes.searchbar}
        onCancelSearch={cancelSearch}
        onKeyUp={keyUp}
      />
    </Box>
  );
}

import React from "react";
import SearchBar from "material-ui-search-bar";
import { Box, Button } from "@material-ui/core";
import { useStyles } from "containers/projects/style";
import { ResetBtn } from "components/common/ResetBtn";

export default function TableHeader({
  searched,
  cancelSearch,
  keyUp,
  handleReset,
  openInvite = false,
  setOpenInvite,
}) {
  const classes = useStyles();
  return (
    <Box className={`${classes.container} ${classes.header} ${classes.flex}`}>
      <Box className={classes.flex}>
        <SearchBar
          value={searched}
          className={classes.searchbar}
          onCancelSearch={cancelSearch}
          onKeyUp={keyUp}
        />
        <ResetBtn onClick={handleReset} />
      </Box>
      <Box>
        <Button
          color="primary"
          variant="contained"
          disableElevation
          className={classes.button}
          onClick={() => {
            setOpenInvite(true);
          }}
        >
          Send invitations
        </Button>
      </Box>
    </Box>
  );
}

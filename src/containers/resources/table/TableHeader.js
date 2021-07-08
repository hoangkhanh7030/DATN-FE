import { IconButton, TableHead, TableRow, Typography } from "@material-ui/core";
import React from "react";
import { StyledTableCell } from "./style";

export default function EnhancedTableHead(props) {
  const { classes } = props;

  return (
    <TableHead className={classes.headRoot}>
      <TableRow>
        <StyledTableCell align="center" width="10%">
          Avatar
        </StyledTableCell>
        <StyledTableCell align="left" width="26%">
          <Typography variant="h3" className={`${classes.flex}`}>
            Name
            <IconButton
              className={`fas fa-sort ${classes.sortIcon}`}
            ></IconButton>
          </Typography>
        </StyledTableCell>
        <StyledTableCell width="20%">
          <Typography variant="h3" className={`${classes.titleCenter}`}>
            Team
            <IconButton
              className={`fas fa-sort ${classes.rightSortIcon}`}
            ></IconButton>
          </Typography>
        </StyledTableCell>
        <StyledTableCell width="20%">
          <Typography variant="h3" className={`${classes.titleCenter}`}>
            Position
            <IconButton
              className={`fas fa-sort ${classes.rightSortIcon}`}
            ></IconButton>
          </Typography>
        </StyledTableCell>
        <StyledTableCell width="12%">
          <Typography variant="h3" className={`${classes.titleCenter}`}>
            Status
            <IconButton
              className={`fas fa-sort ${classes.rightSortIcon}`}
            ></IconButton>
          </Typography>
        </StyledTableCell>
        <StyledTableCell align="center" width="12%">
          Actions
        </StyledTableCell>
      </TableRow>
    </TableHead>
  );
}

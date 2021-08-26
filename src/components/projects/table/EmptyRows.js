import React from "react";
import { TableRow, Typography } from "@material-ui/core";
import { StyledTableCell } from "containers/projects/style";

export const EmptyRows = ({ isFullPage, isEmptyTable, rowHeight, users }) => {
  const EMPTY_TABLE = users ? "No users to load." : "No projects to load.";

  return isFullPage ? (
    <></>
  ) : (
    <TableRow className={rowHeight}>
      <StyledTableCell colSpan={6}>
        <Typography color="primary" align="center">
          {isEmptyTable ? EMPTY_TABLE : ""}
        </Typography>
      </StyledTableCell>
    </TableRow>
  );
};

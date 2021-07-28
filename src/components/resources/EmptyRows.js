import React from "react";
import { TableRow, Typography } from "@material-ui/core";
import { StyledTableCell } from "containers/resources/table/style";

const EMPTY_TABLE = "No resources to load.";

export const EmptyRows = ({ isFullPage, isEmptyTable, rowHeight }) => {
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

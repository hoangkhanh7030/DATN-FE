import React from "react";
import { TableRow } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { StyledTableCell } from "containers/projects/style";

let COLS = [1, 2, 3, 4];
const ROWS = [1, 2, 3, 4, 5];

export const LoadingTable = ({ users }) => {
  COLS = users ? ROWS : COLS;

  return ROWS.map((el) => (
    <TableRow key={el} height={58}>
      {COLS.map((el) => (
        <StyledTableCell key={el}>
          <Skeleton />
        </StyledTableCell>
      ))}
    </TableRow>
  ));
};

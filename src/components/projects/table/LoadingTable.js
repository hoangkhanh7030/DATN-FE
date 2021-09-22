import React, { useState, useEffect } from "react";
import { TableRow } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { StyledTableCell } from "containers/projects/style";

const rows = [1, 2, 3, 4, 5];

export const LoadingTable = ({ users }) => {
  const [cols, setCols] = useState([1, 2, 3, 4]);
  useEffect(() => {
    if (users) setCols([1, 2, 3, 4, 5]);
  }, [users]);

  return rows.map((el) => (
    <TableRow key={el} height={58}>
      {cols.map((el) => (
        <StyledTableCell key={el}>
          <Skeleton />
        </StyledTableCell>
      ))}
    </TableRow>
  ));
};

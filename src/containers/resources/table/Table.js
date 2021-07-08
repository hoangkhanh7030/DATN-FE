import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableRow,
} from "@material-ui/core";
import React from "react";
import { StyledTableCell, useStyles } from "./style";
import TableHeader from "./TableHeader";
import EnhancedTableRow from "./TableRow";
export default function ResourcesTable(props) {
  const { data, rowsPerPage, handleSort, handleOpenDialog } = props;
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length);
  const classes = useStyles({ emptyRows });

  const hasData = () => {
    return data && data.length > 0;
  };
  const hasEmptyRows = () => {
    return emptyRows > 0 && data.length !== 0;
  };
  return (
    <TableContainer component={Paper} className={classes.root} elevation={0}>
      <Table className={classes.table}>
        <TableHeader classes={classes} handleSort={handleSort} />
        <TableBody>
          {hasData() ? (
            data.map((row) => {
              return (
                <EnhancedTableRow
                  row={row}
                  handleOpenDialog={handleOpenDialog}
                ></EnhancedTableRow>
              );
            })
          ) : (
            <></>
          )}
          {hasEmptyRows() ? (
            <TableRow className={classes.emptyRows}>
              <StyledTableCell colSpan={6} />
            </TableRow>
          ) : (
            <></>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

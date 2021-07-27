import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { INITIAL_ROWS_PER_PAGE } from "constants/index";
import React from "react";
import { StyledTableCell, useStyles } from "./style";
import TableHeader from "./TableHeader";
import EnhancedTableRow from "./TableRow";
import * as _ from "underscore";

const COLS = [1, 2, 3, 4, 5, 6];
const ROWS = [1, 2, 3, 4, 5];
const EMPTY_TABLE = "No resources to load.";

export default function ResourcesTable(props) {
  const {
    data = [],
    emptyRows = INITIAL_ROWS_PER_PAGE,
    handleSort,
    isLoading = false,
    handleOpenDialog,
  } = props;
  const classes = useStyles({ emptyRows });

  const noData = () => {
    return data.length <= 0;
  };
  const noEmptyRows = () => {
    return emptyRows <= 0 || noData();
  };

  return (
    <TableContainer component={Paper} className={classes.root} elevation={0}>
      <Table className={classes.table}>
        <TableHeader classes={classes} handleSort={handleSort} />
        <TableBody>
          {isLoading ? (
            ROWS.map((el) => (
              <TableRow key={el}>
                {COLS.map((el) => (
                  <StyledTableCell key={el} height="26">
                    <Skeleton />
                  </StyledTableCell>
                ))}
              </TableRow>
            ))
          ) : noData() ? (
            <TableRow className={classes.emptyRows}>
              <StyledTableCell colSpan={6}>
                <Typography color="primary" align="center">
                  {EMPTY_TABLE}
                </Typography>
              </StyledTableCell>
            </TableRow>
          ) : (
            data.map((row) => {
              return (
                <EnhancedTableRow
                  key={_.get(row, "id")}
                  row={row}
                  handleOpenDialog={handleOpenDialog}
                ></EnhancedTableRow>
              );
            })
          )}
          {noEmptyRows() ? (
            <></>
          ) : (
            <TableRow className={classes.emptyRows}>
              <StyledTableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

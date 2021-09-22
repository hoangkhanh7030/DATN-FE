import { Paper, Table, TableBody, TableContainer } from "@material-ui/core";
import { EmptyRows } from "components/resources/EmptyRows";
import { LoadingTable } from "components/resources/LoadingTable";
import { INITIAL_ROWS_PER_PAGE } from "constants/index";
import React from "react";
import * as _ from "underscore";
import { useStyles } from "./style";
import TableHeader from "./TableHeader";
import EnhancedTableRow from "./TableRow";

export default function ResourcesTable(props) {
  const {
    data = [],
    emptyRows = INITIAL_ROWS_PER_PAGE,
    handleSort,
    isLoading = false,
    handleOpenDialog,
    handelDeleteResource,
    callApiArchiveResource,
  } = props;
  const classes = useStyles({ emptyRows });

  return (
    <TableContainer component={Paper} className={classes.root} elevation={0}>
      <Table className={classes.table}>
        <TableHeader classes={classes} handleSort={handleSort} />
        <TableBody>
          {isLoading ? (
            <LoadingTable users={false} />
          ) : (
            <>
              {data.map((row) => (
                <EnhancedTableRow
                  key={_.get(row, "id")}
                  row={row}
                  handleOpenDialog={handleOpenDialog}
                  handleDeleteProject={handelDeleteResource}
                  handleArchiveProject={callApiArchiveResource}
                />
              ))}

              <EmptyRows
                isFullPage={!emptyRows}
                isEmptyTable={data.length === 0}
                rowHeight={classes.emptyRows}
              />
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

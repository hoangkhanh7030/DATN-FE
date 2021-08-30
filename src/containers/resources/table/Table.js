import { Paper, Table, TableBody, TableContainer } from "@material-ui/core";
import { INITIAL_ROWS_PER_PAGE } from "constants/index";
import React, { useState } from "react";
import { useStyles } from "./style";
import TableHeader from "./TableHeader";
import EnhancedTableRow from "./TableRow";
import * as _ from "underscore";
import { LoadingTable } from "components/resources/LoadingTable";
import { EmptyRows } from "components/resources/EmptyRows";
import AlertDialog from "components/common/AlertDialog";

export default function ResourcesTable(props) {
  const {
    data = [],
    emptyRows = INITIAL_ROWS_PER_PAGE,
    handleSort,
    isLoading = false,
    handleOpenDialog,
    handelDeleteResource,
  } = props;
  const classes = useStyles({ emptyRows });

  const [currentResource, setCurrentResource] = useState({});
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleOpenDeleteDialog = (id) => {
    setCurrentResource(data.find((row) => row.id === id));
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  return (
    <TableContainer component={Paper} className={classes.root} elevation={0}>
      <Table className={classes.table}>
        <TableHeader classes={classes} handleSort={handleSort} />
        <TableBody>
          {isLoading ? (
            <LoadingTable />
          ) : (
            <>
              {data.map((row) => (
                <EnhancedTableRow
                  key={_.get(row, "id")}
                  row={row}
                  handleOpenDialog={handleOpenDialog}
                  handleOpenDeleteDialog={handleOpenDeleteDialog}
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
      <AlertDialog
        open={openDeleteDialog}
        content={`Do you really want to delete this resource?`}
        handleCloseDialog={handleCloseDeleteDialog}
        handelActionDialog={() =>
          handelDeleteResource(
            _.get(currentResource, "id"),
            handleCloseDeleteDialog
          )
        }
      />
    </TableContainer>
  );
}

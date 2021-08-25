import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
} from "@material-ui/core";

import { StyledTableCell, useStyles } from "containers/projects/style";
import UserRow from "./TableRow";
import { LoadingTable } from "components/projects/table/LoadingTable";
import { EmptyRows } from "components/projects/table/EmptyRows";
import * as _ from "underscore";
import { EMAIL, STATUS_NAME, CREATED_DATE, ROLE } from "constants/index";

const UsersTable = ({ rows = [], emptyRows = 5, handleSort, isLoading }) => {
  const classes = useStyles({ emptyRows });

  return (
    <TableContainer component={Paper} elevation={0}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell width="40%">
              <Typography variant="h3" className={classes.tableTitleCenter}>
                Email
                <IconButton
                  className={`${classes.tableTitleIcon} ${classes.tableTitleIconCenter} fas fa-sort`}
                  onClick={() => handleSort(EMAIL)}
                ></IconButton>
              </Typography>
            </StyledTableCell>

            <StyledTableCell width="15%">
              <Typography variant="h3" className={classes.tableTitleCenter}>
                Status
                <IconButton
                  className={`${classes.tableTitleIcon} ${classes.tableTitleIconCenter} fas fa-sort`}
                  onClick={() => handleSort(STATUS_NAME)}
                ></IconButton>
              </Typography>
            </StyledTableCell>

            <StyledTableCell width="15%">
              <Typography variant="h3" className={classes.tableTitleCenter}>
                Role
                <IconButton
                  className={`${classes.tableTitleIcon} ${classes.tableTitleIconCenter} fas fa-sort`}
                  onClick={() => handleSort(ROLE)}
                ></IconButton>
              </Typography>
            </StyledTableCell>

            <StyledTableCell width="15%">
              <Typography variant="h3" className={classes.tableTitleCenter}>
                Invited Date
                <IconButton
                  className={`${classes.tableTitleIcon} ${classes.tableTitleIconCenter} fas fa-sort`}
                  onClick={() => handleSort(CREATED_DATE)}
                ></IconButton>
              </Typography>
            </StyledTableCell>

            <StyledTableCell width="15%" align="center">
              Actions
            </StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {isLoading ? (
            <LoadingTable users={true} />
          ) : (
            <>
              {rows.map((row) => (
                <UserRow key={_.get(row, "id")} user={row} />
              ))}

              <EmptyRows
                isFullPage={!emptyRows}
                isEmptyTable={rows.length === 0}
                rowHeight={classes.emptyRows}
              />
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;

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
import { EMAIL } from "constants/index";

const STATUS = "auth_provider";
const CREATED_DATE = "create_date";

const UsersTable = ({
  rows = [],
  emptyRows = 5,
  sortName = "",
  handleSort,
  isLoading,
  handleArchiveUser,
  handleDeleteUser,
  handleReInviteUser,
}) => {
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
                  style={{ color: sortName === EMAIL ? "black" : "#CECECE" }}
                  onClick={() => handleSort(EMAIL)}
                ></IconButton>
              </Typography>
            </StyledTableCell>

            <StyledTableCell width="15%">
              <Typography variant="h3" className={classes.tableTitleCenter}>
                Status
                <IconButton
                  className={`${classes.tableTitleIcon} ${classes.tableTitleIconCenter} fas fa-sort`}
                  style={{ color: sortName === STATUS ? "black" : "#CECECE" }}
                  onClick={() => handleSort(STATUS)}
                ></IconButton>
              </Typography>
            </StyledTableCell>

            <StyledTableCell width="15%">
              <Typography variant="h3" className={classes.tableTitleCenter}>
                Role
              </Typography>
            </StyledTableCell>

            <StyledTableCell width="15%">
              <Typography variant="h3" className={classes.tableTitleCenter}>
                Created Date
                <IconButton
                  className={`${classes.tableTitleIcon} ${classes.tableTitleIconCenter} fas fa-sort`}
                  style={{
                    color:
                      sortName === CREATED_DATE || sortName === ""
                        ? "black"
                        : "#CECECE",
                  }}
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
              {rows.map((row, index) => (
                <UserRow
                  key={index}
                  user={row}
                  handleArchiveUser={handleArchiveUser}
                  handleDeleteUser={handleDeleteUser}
                  handleReInviteUser={handleReInviteUser}
                />
              ))}

              <EmptyRows
                isFullPage={!emptyRows}
                isEmptyTable={rows.length === 0}
                rowHeight={classes.emptyRows}
                users={true}
              />
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;

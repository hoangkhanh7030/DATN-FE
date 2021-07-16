import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  IconButton,
} from "@material-ui/core";

import { commonStyle } from "../../assets/css/Common";
import { StyledTableCell, StyledTableRow, useStyles } from "./style";
import * as _ from "underscore";

const ProjectsTable = ({ rows = [], emptyRows = 5, handleSort }) => {
  const classes = useStyles();
  const commonClasses = commonStyle();

  const EMPTY_TABLE = "No projects to load.";

  return (
    <TableContainer component={Paper} elevation={0}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell width="45%">
              <Typography variant="h3" className={classes.flex}>
                Project Name
                <IconButton
                  className={`${classes.tableTitleIcon} fas fa-sort`}
                  onClick={() => handleSort("name")}
                ></IconButton>
              </Typography>
            </StyledTableCell>
            <StyledTableCell width="25%" align="center">
              <Typography variant="h3" className={classes.tableTitleCenter}>
                Client Name
                <IconButton
                  className={`${classes.tableTitleIcon} ${classes.tableTitleIconCenter} fas fa-sort`}
                  onClick={() => handleSort("clientName")}
                ></IconButton>
              </Typography>
            </StyledTableCell>
            <StyledTableCell width="15%" align="center">
              <Typography variant="h3" className={classes.tableTitleCenter}>
                Status
                <IconButton
                  className={`${classes.tableTitleIcon} ${classes.tableTitleIconCenter} fas fa-sort`}
                  onClick={() => handleSort("isActivate")}
                ></IconButton>
              </Typography>
            </StyledTableCell>
            <StyledTableCell width="15%" align="center">
              Actions
            </StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows &&
            rows.map((row) => {
              return (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    <IconButton
                      className={`fas fa-circle ${commonClasses.icon}  ${classes.color}`}
                      style={{ color: row.color }}
                    ></IconButton>
                    {_.get(row, "name")}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {_.get(row, "clientName")}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      className={`${classes.status}  ${
                        _.get(row, "isActivate")
                          ? classes.active
                          : classes.inactive
                      }`}
                    >
                      {_.get(row, "isActivate") ? "active" : "archived"}
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <i
                      className={`fas fa-pencil-alt ${commonClasses.action}`}
                    ></i>
                    <i
                      className={`fas fa-inbox ${commonClasses.action} ${classes.midIcon}`}
                    ></i>
                    <i
                      className={`far fa-trash-alt ${commonClasses.action}`}
                    ></i>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}

          {emptyRows > 0 && (
            <TableRow style={{ height: emptyRows * 58 }}>
              <StyledTableCell colSpan={6}>
                {rows.length === 0 && (
                  <Typography color="primary" align="center">
                    {EMPTY_TABLE}
                  </Typography>
                )}
              </StyledTableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProjectsTable;

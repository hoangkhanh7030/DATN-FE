import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@material-ui/core";

import { commonStyle } from "../../assets/css/Common";
import { StyledTableCell, StyledTableRow, useStyles } from "./style";

const ProjectsTable = ({ rows, page, rowsPerPage, emptyRows }) => {
  const classes = useStyles();
  const commonClasses = commonStyle();

  return (
    <TableContainer component={Paper} style={{ borderRadius: 0 }}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Project Name</StyledTableCell>
            <StyledTableCell align="center">Client Name</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .slice(
              page === 1 ? page - 1 : (page - 1) * rowsPerPage,
              page * rowsPerPage
            )
            .map((row) => {
              return (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    <i
                      className={`fas fa-circle ${commonClasses.icon}`}
                      style={{ color: row.color }}
                    ></i>
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.calories}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      className={
                        row.fat === "active" ? classes.active : classes.inactive
                      }
                    >
                      {row.fat}
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <i
                      className={`fas fa-pencil-alt ${commonClasses.action}`}
                    ></i>
                    <i className={`fas fa-inbox ${commonClasses.action}`}></i>
                    <i
                      className={`far fa-trash-alt ${commonClasses.action}`}
                    ></i>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}

          {emptyRows > 0 && (
            <TableRow style={{ height: emptyRows }}>
              <StyledTableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProjectsTable;

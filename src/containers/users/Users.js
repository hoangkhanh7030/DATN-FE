import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { ThemeProvider, Box } from "@material-ui/core";
import { theme } from "assets/css/Common";
import TableHeader from "./TableHeader";
import UsersTable from "./TableContent";
import TableFooter from "containers/projects/TableFooter";
import { useStyles } from "containers/projects/style";
import * as _ from "underscore";
import {
  SIZE_OPTION,
  INITIAL_ROWS_PER_PAGE,
  INITIAL_PAGE,
} from "constants/index";

export default function Users() {
  const { id } = useParams();
  const classes = useStyles();
  const [users, setUsers] = useState([]);

  const [params, setParams] = useState({
    page: INITIAL_PAGE,
    size: INITIAL_ROWS_PER_PAGE,
    searchName: "",
    sortName: "",
    type: false,
  });

  useEffect(() => {}, [id, params]);

  const keyUp = (event) => {
    if (event.keyCode === 13 || event.target.value === "") {
      setParams({ ...params, searchName: event.target.value });
    }
  };

  const cancelSearch = () => {
    setParams({ ...params, searchName: "" });
  };

  const handleSort = (orderBy) => {
    setParams({ ...params, sortName: orderBy, type: !params.type });
  };

  const handleChangePage = (event, newPage) => {
    setParams({ ...params, page: newPage });
  };

  const handleChangeDropdown = (e) => {
    setParams({ ...params, page: 0 });
    const { name, value } = e.target;
    if (name === SIZE_OPTION) setParams({ ...params, size: value });

    return;
  };
  const emptyRows = params.size - Math.min(params.size, users.length);
  return (
    <ThemeProvider theme={theme}>
      <TableHeader
        searched={params.searchName}
        cancelSearch={cancelSearch}
        keyUp={keyUp}
      />

      <Box className={classes.boxTable}>
        <UsersTable
          rows={users}
          page={params.page}
          rowsPerPage={params.size}
          emptyRows={emptyRows}
          handleSort={handleSort}
        />
      </Box>

      <TableFooter
        rowsPerPage={params.size}
        handleChangePage={handleChangePage}
        handleChangeDropdown={handleChangeDropdown}
        numPage={5}
        page={params.page}
      />
    </ThemeProvider>
  );
}

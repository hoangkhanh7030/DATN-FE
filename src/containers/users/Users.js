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
import { clearMessage } from "redux/actions/msgAction";
import { getUsers } from "redux/actions/userAction";

export default function Users() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const storeUsers = useSelector((state) => state.users);

  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [searched, setSearched] = useState("");
  const [params, setParams] = useState({
    page: INITIAL_PAGE,
    size: INITIAL_ROWS_PER_PAGE,
    searchName: "",
    sortName: "",
    type: false,
  });

  const fetchUsers = () => {
    dispatch(getUsers(id, { ...params, searchName: searched }));
  };

  useEffect(() => {
    dispatch(clearMessage());
    fetchUsers();
  }, [id, searched, params]);

  useEffect(() => {
    if (!storeUsers.data) {
      return;
    }

    setUsers(storeUsers.data);
  }, [storeUsers.data]);

  const keyUp = (event) => {
    if (event.keyCode === 13 || event.target.value === "") {
      setSearched(event.target.value);
    }
  };

  const cancelSearch = () => {
    setSearched("");
  };

  const handleSort = (orderBy) => {
    setParams({ ...params, sortName: orderBy, type: !params.type });
  };

  const handleChangePage = (event, newPage) => {
    setParams({ ...params, page: newPage });
  };

  const handleChangeDropdown = (e) => {
    const { name, value } = e.target;
    if (name === SIZE_OPTION)
      setParams({ ...params, page: INITIAL_PAGE, size: value });

    return;
  };

  const handleReset = () => {
    setParams({
      ...params,
      page: INITIAL_PAGE,
      searchName: "",
      sortName: "",
      type: false,
    });
  };

  const emptyRows = params.size - Math.min(params.size, _.size(users));

  return (
    <ThemeProvider theme={theme}>
      <TableHeader
        searched={searched}
        cancelSearch={cancelSearch}
        keyUp={keyUp}
        handleReset={handleReset}
      />

      <Box className={classes.boxTable}>
        <UsersTable
          rows={users}
          page={params.page}
          rowsPerPage={params.size}
          emptyRows={emptyRows}
          handleSort={handleSort}
          isLoading={storeUsers.isLoading}
        />
      </Box>

      <TableFooter
        rowsPerPage={params.size}
        handleChangePage={handleChangePage}
        handleChangeDropdown={handleChangeDropdown}
        numPage={storeUsers.numPage}
        page={params.page}
      />
    </ThemeProvider>
  );
}

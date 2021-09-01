import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { ThemeProvider, Box } from "@material-ui/core";
import { theme } from "assets/css/Common";
import { Message } from "components/common/Message";
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
import {
  getUsers,
  archiveUser,
  deleteUser,
  reInviteUser,
  inviteToWorkspace,
} from "redux/actions/userAction";
import InviteDialog from "./dialog/InviteDialog";

export default function Users() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const storeUsers = useSelector((state) => state.users);
  const { message } = useSelector((state) => state.message);
  const [hasMessage, setOpenMessage] = useState(false);

  const classes = useStyles();
  const [users, setUsers] = useState([]);

  const [openInvite, setOpenInvite] = useState(false);

  const [params, setParams] = useState({
    page: INITIAL_PAGE,
    size: INITIAL_ROWS_PER_PAGE,
    searchName: "",
    sortName: "",
    type: false,
  });

  const fetchUsers = () => {
    dispatch(getUsers(id, params));
  };

  useEffect(() => {
    fetchUsers();
  }, [id, params]);

  useEffect(() => {
    if (!storeUsers.data) {
      return;
    }

    setUsers(storeUsers.data);
  }, [storeUsers.data]);

  const keyUp = (event) => {
    const value = event.target.value;
    if (event.keyCode === 13 || value === "") {
      if (value !== params.searchName)
        setParams({
          ...params,
          searchName: value,
          page: INITIAL_PAGE,
        });
    }
  };

  const cancelSearch = () => {
    setParams({ ...params, searchName: "", page: INITIAL_PAGE });
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

  const handleCloseMessage = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenMessage(false);
  };

  const handleArchiveUser = (userID) => {
    dispatch(archiveUser(userID))
      .then(() => {
        fetchUsers();
        setOpenMessage(true);
      })
      .catch(() => {
        setOpenMessage(true);
      });
  };

  const handleDeleteUser = (userID) => {
    dispatch(deleteUser(id, userID))
      .then(() => {
        setParams({
          ...params,
          page: _.size(users) > 1 ? params.page : params.page - 1,
        });
        setOpenMessage(true);
      })
      .catch(() => {
        setOpenMessage(true);
      });
  };

  const handleReInviteUser = (updatedData) => {
    dispatch(reInviteUser(id, updatedData))
      .then(() => {
        setOpenMessage(true);
      })
      .catch(() => {
        setOpenMessage(true);
      });
  };

  const handleInvite = (data) => {
    dispatch(inviteToWorkspace(id, data))
      .then(() => {
        fetchUsers();
        setOpenMessage(true);
      })
      .catch(() => {
        setOpenMessage(true);
      });
    setOpenInvite(false);
  };

  const emptyRows = params.size - Math.min(params.size, _.size(users));

  return (
    <ThemeProvider theme={theme}>
      <TableHeader
        searched={params.searchName}
        cancelSearch={cancelSearch}
        keyUp={keyUp}
        handleReset={handleReset}
        openInvite={openInvite}
        setOpenInvite={setOpenInvite}
      />

      <Box className={classes.boxTable}>
        <UsersTable
          rows={users}
          page={params.page}
          rowsPerPage={params.size}
          emptyRows={emptyRows}
          handleSort={handleSort}
          isLoading={storeUsers.isLoading}
          handleArchiveUser={handleArchiveUser}
          handleDeleteUser={handleDeleteUser}
          handleReInviteUser={handleReInviteUser}
        />
      </Box>

      <TableFooter
        rowsPerPage={params.size}
        handleChangePage={handleChangePage}
        handleChangeDropdown={handleChangeDropdown}
        numPage={storeUsers.numPage}
        page={params.page}
      />
      {openInvite ? (
        <InviteDialog
          workspaceId={id}
          isOpen={openInvite}
          setOpenInvite={setOpenInvite}
          handleInvite={handleInvite}
        />
      ) : (
        <Box></Box>
      )}
      {message ? (
        <Message
          message={message}
          isOpen={hasMessage}
          handleCloseMessage={handleCloseMessage}
          type={_.get(storeUsers, "status") === 200 ? "success" : "error"}
        />
      ) : (
        <></>
      )}
    </ThemeProvider>
  );
}

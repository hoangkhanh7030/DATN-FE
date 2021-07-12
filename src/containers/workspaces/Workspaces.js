import { Redirect } from "react-router-dom";
import {
  Grid,
  Typography,
  Paper,
  IconButton,
  ThemeProvider,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { theme } from "assets/css/Common";
import { useStyles } from "./style";
import * as _ from "underscore";

import {
  addWorkspace,
  getWorkspaces,
  updateWorkspace,
  deleteWorkspace,
} from "redux/actions/workspaceAction";
import * as constants from "constants/index";
import Workspace from "components/workspace/Workspace";
import WorkspaceDialog from "components/workspace/dialog/Dialog";
import { Message } from "components/common/Message";
import { Progress } from "components/common/Progress";
import { clearMessage } from "redux/actions/msgAction";

export default function Workspaces() {
  const classes = useStyles();

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { status, isLoading } = useSelector((state) => state.workspaces);
  const { message } = useSelector((state) => state.message);
  const [hasMessage, setOpenMessage] = useState(false);

  const [name, setName] = useState("");
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [dialogError, setDialogError] = useState("");

  const dispatch = useDispatch();

  const [workspaces, setWorkspaces] = useState([]);
  const storeWorkspaces = useSelector((state) => state.workspaces);

  useEffect(() => {
    dispatch(clearMessage());

    dispatch(getWorkspaces()).catch(() => setOpenMessage(true));
  }, [dispatch]);

  useEffect(() => {
    if (!storeWorkspaces.data) {
      return;
    }
    setWorkspaces(storeWorkspaces.data);
  }, [storeWorkspaces.data]);

  if (!isLoggedIn) return <Redirect to={constants.LOGIN_URL} />;

  // handle workspace dialog
  const createContent = {
    title: "Create new workspace",
    btnTitle: "Create",
  };
  const handleOpenCreateDialog = () => {
    setOpenCreate(true);
  };
  const handleCloseCreateDialog = () => {
    setOpenCreate(false);
    setName("");
  };

  const editContent = {
    title: "Edit workspace",
    btnTitle: "Save",
  };
  const handleOpenEditDialog = () => {
    setOpenEdit(true);
  };
  const handleCloseEditDialog = () => {
    setOpenEdit(false);
    setName("");
  };
  const handleOpenDeleteDialog = () => {
    setOpenDelete(true);
  };
  const handleCloseDeleteDialog = () => {
    setOpenDelete(false);
  };

  const handleInputName = (e) => {
    if (!e.target.value.trim()) {
      setDialogError(constants.EMPTY_ERROR);
    } else {
      setDialogError("");
    }

    setName(e.target.value);
  };

  // handle create workspace
  const handelCreateWorkspace = () => {
    if (!name) return;
    const data = {
      name,
    };
    dispatch(addWorkspace(data))
      .then(() => {
        dispatch(getWorkspaces()).catch(() => {
          setOpenMessage(true);
        });
        setOpenMessage(true);
      })
      .catch(() => {
        setOpenMessage(true);
      });

    setName("");
    setOpenCreate(false);
  };

  // handle edit workspace
  const handelEditWorkspace = (id) => {
    if (!name) return;
    const data = {
      name,
    };

    dispatch(updateWorkspace(data, id))
      .then(() => {
        dispatch(getWorkspaces()).catch(() => {
          setOpenMessage(true);
        });
        setOpenMessage(true);
      })
      .catch(() => {
        setOpenMessage(true);
      });

    setOpenEdit(false);
  };

  const handelDeleteWorkspace = (id) => {
    dispatch(deleteWorkspace(id))
      .then(() => {
        dispatch(getWorkspaces()).catch(() => {
          setOpenMessage(true);
        });
        setOpenMessage(true);
      })
      .catch(() => {
        setOpenMessage(true);
      });

    setOpenDelete(false);
  };

  const handleCloseMessage = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenMessage(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h1" className={classes.header}>
        Workspaces
      </Typography>
      <Grid container spacing={5}>
        {workspaces &&
          workspaces.map((workspace) => (
            <Grid key={_.get(workspace, "id")} item xs={12} sm={4} md={3}>
              <Workspace
                workspace={workspace}
                open={openEdit}
                openDelete={openDelete}
                content={editContent}
                name={_.get(workspace, "name")}
                handleCloseDialog={handleCloseEditDialog}
                handleOpenDialog={handleOpenEditDialog}
                handleOpenDeleteDialog={handleOpenDeleteDialog}
                handleCloseDeleteDialog={handleCloseDeleteDialog}
                handleInputName={handleInputName}
                error={dialogError}
                onHandleSubmit={() =>
                  handelEditWorkspace(_.get(workspace, "id"))
                }
                handelDeleteWorkspace={() =>
                  handelDeleteWorkspace(_.get(workspace, "id"))
                }
              />
            </Grid>
          ))}

        <Grid item xs={12} sm={4} md={3}>
          <Paper className={classes.paper}>
            <div onClick={handleOpenCreateDialog}>
              <IconButton>
                <AddIcon className={classes.addIcon} />
              </IconButton>
            </div>
            <Typography variant="h3" className={classes.newWorkspace}>
              NEW WORKSPACE
            </Typography>
            <WorkspaceDialog
              open={openCreate}
              content={createContent}
              name={name}
              handleCloseDialog={handleCloseCreateDialog}
              handleInputName={handleInputName}
              onHandleSubmit={handelCreateWorkspace}
              error={dialogError}
            />
          </Paper>
        </Grid>
      </Grid>

      {message && (
        <Message
          message={message}
          isOpen={hasMessage}
          handleCloseMessage={handleCloseMessage}
          type={status === 200 ? "success" : "error"}
        />
      )}

      <Progress isOpen={isLoading} />
    </ThemeProvider>
  );
}

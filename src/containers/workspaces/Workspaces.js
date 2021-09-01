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
import Workspace from "components/workspace/Workspace";
import WorkspaceDialog from "components/workspace/dialog/Dialog";
import { Message } from "components/common/Message";
import { Progress } from "components/common/Progress";
import { clearMessage } from "redux/actions/msgAction";

const INITIAL_WORKSPACE = {
  id: "",
  name: "",
  emailSuffixes: [],
  workDays: [false, true, true, true, true, true, false],
};

export default function Workspaces() {
  const classes = useStyles();

  const { status, isLoading } = useSelector((state) => state.workspaces);
  const { message } = useSelector((state) => state.message);
  const [isOpenMessage, setIsOpenMessage] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [workspace, setWorkspace] = useState(null);

  const dispatch = useDispatch();

  const [workspaces, setWorkspaces] = useState([]);
  const storeWorkspaces = useSelector((state) => state.workspaces);

  useEffect(() => {
    dispatch(clearMessage());

    dispatch(getWorkspaces()).catch(() => setIsOpenMessage(true));
  }, [dispatch]);

  useEffect(() => {
    if (!storeWorkspaces.data) {
      return;
    }
    setWorkspaces(storeWorkspaces.data);
  }, [storeWorkspaces.data]);

  // handle workspace dialog
  const handleDialog = (workspace = null) => {
    setWorkspace(!openDialog && workspace ? workspace : INITIAL_WORKSPACE);
    setOpenDialog(!openDialog);
  };

  const handleOpenDeleteDialog = () => {
    setOpenDelete(true);
  };
  const handleCloseDeleteDialog = () => {
    setOpenDelete(false);
  };

  // handle create workspace
  const handleCreateWorkspace = (data) => {
    dispatch(addWorkspace(data))
      .then(() => {
        dispatch(getWorkspaces()).catch(() => {
          setIsOpenMessage(true);
        });
        setIsOpenMessage(true);
      })
      .catch(() => {
        setIsOpenMessage(true);
      });
  };

  // handle edit workspace
  const handleEditWorkspace = (id, data) => {
    dispatch(updateWorkspace(data, id))
      .then(() => {
        dispatch(getWorkspaces()).catch(() => {
          setIsOpenMessage(true);
        });
        setIsOpenMessage(true);
      })
      .catch(() => {
        setIsOpenMessage(true);
      });
  };

  const handelDeleteWorkspace = (id) => {
    dispatch(deleteWorkspace(id))
      .then(() => {
        dispatch(getWorkspaces()).catch(() => {
          setIsOpenMessage(true);
        });
        setIsOpenMessage(true);
      })
      .catch(() => {
        setIsOpenMessage(true);
      });

    setOpenDelete(false);
  };

  const handleCloseMessage = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsOpenMessage(false);
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
                openDelete={openDelete}
                handleOpenDialog={handleDialog}
                handleOpenDeleteDialog={handleOpenDeleteDialog}
                handleCloseDeleteDialog={handleCloseDeleteDialog}
                handelDeleteWorkspace={() =>
                  handelDeleteWorkspace(_.get(workspace, "id"))
                }
              />
            </Grid>
          ))}

        <Grid item xs={12} sm={4} md={3}>
          <Paper className={classes.paper} elevation={0}>
            <div onClick={() => handleDialog()}>
              <IconButton>
                <AddIcon className={classes.addIcon} />
              </IconButton>
            </div>
            <Typography variant="h3" className={classes.newWorkspace}>
              NEW WORKSPACE
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      {openDialog ? (
        <WorkspaceDialog
          open={openDialog}
          workspace={workspace}
          workspaces={workspaces}
          setWorkspace={setWorkspace}
          handleCloseDialog={handleDialog}
          handleAdd={handleCreateWorkspace}
          handleEdit={handleEditWorkspace}
        />
      ) : (
        <></>
      )}

      {message && (
        <Message
          message={message}
          isOpen={isOpenMessage}
          handleCloseMessage={handleCloseMessage}
          type={status === 200 ? "success" : "error"}
        />
      )}

      <Progress isOpen={isLoading} />
    </ThemeProvider>
  );
}

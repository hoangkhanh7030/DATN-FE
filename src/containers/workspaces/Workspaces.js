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
import { theme } from "../../assets/css/Common";
import WorkspaceDialog from "../../components/workspace/dialog/Dialog";
import Workspace from "../../components/workspace/Workspace";
import { useStyles } from "./style";
import { Progress } from "../../components/common/Progress";
import {
  addWorkspace,
  getWorkspaces,
  updateWorkspace,
} from "../../redux/actions/workspaceAction";

export default function Workspaces() {
  const classes = useStyles();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [name, setName] = useState("");
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const dispatch = useDispatch();
  const [workspaces, setWorkspaces] = useState([]);
  const storeWorkspaces = useSelector((state) => state.workspaces);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    dispatch(getWorkspaces()).then(() => {
      setLoading(false);
    });
  }, []);
  useEffect(() => {
    if (!storeWorkspaces.data) {
      return;
    }
    setWorkspaces(storeWorkspaces.data);
  }, [storeWorkspaces.data]);

  if (!isLoggedIn) return <Redirect to="/" />;

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

  const handleInputName = (e) => {
    setName(e.target.value);
  };

  // handle create workspace
  const handelCreateWorkspace = () => {
    let data = {
      name,
    };
    setLoading(true);

    dispatch(addWorkspace(data)).then(() => {
      dispatch(getWorkspaces()).then(() => {
        setLoading(false);
      });
    });

    setName("");
    setOpenCreate(false);
  };

  // handle edit workspace
  const handelEditWorkspace = (id) => {
    let data = {
      name,
    };

    setLoading(true);

    dispatch(updateWorkspace(data, id)).then(() => {
      dispatch(getWorkspaces()).then(() => {
        setLoading(false);
      });
    });

    setOpenEdit(false);
  };

  return (
    <ThemeProvider theme={theme}>
      {" "}
      <Typography variant="h1" style={{ marginBottom: "10px" }}>
        Workspaces
      </Typography>
      <Grid container spacing={5}>
        {workspaces.map((workspace) => (
          <Grid key={workspace.id} item xs={12} sm={4} md={3}>
            <Workspace
              workspace={workspace}
              open={openEdit}
              content={editContent}
              name={workspace.name}
              handleCloseDialog={handleCloseEditDialog}
              handleOpenDialog={handleOpenEditDialog}
              handleInputName={handleInputName}
              onHandleSubmit={() => handelEditWorkspace(workspace.id)}
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
            />
          </Paper>
        </Grid>
      </Grid>
      <Progress isOpen={loading} />
    </ThemeProvider>
  );
}

import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  Grid,
  Typography,
  Paper,
  IconButton,
  ThemeProvider,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React, { useState } from "react";
import { theme } from "../../assets/css/Common";
import WorkspaceDialog from "../../components/workspace/dialog/Dialog";
import Workspace from "../../components/workspace/Workspace";
import { useStyles } from "./style";

export default function Workspaces() {
  const classes = useStyles();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [name, setName] = useState("");
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  if (!isLoggedIn) return <Redirect to="/" />;

  const workspaces = [
    {
      id: 3,
      createdDate: "2021-06-22T10:02:43.000+00:00",
      createdBy: 4,
      modifiedDate: "2021-06-22T10:02:49.000+00:00",
      modifiedBy: 4,
      name: "CES",
      projectListLength: 5,
      resourceListLength: 20,
      role: "VIEW",
    },
    {
      id: 1,
      createdDate: "2021-06-22T10:02:38.000+00:00",
      createdBy: 4,
      modifiedDate: "2021-06-22T10:02:46.000+00:00",
      modifiedBy: 4,
      name: "CESCES",
      projectListLength: 4,
      resourceListLength: 15,
      role: "VIEW",
    },
    {
      id: 2,
      createdDate: "2021-06-22T10:02:42.000+00:00",
      createdBy: 4,
      modifiedDate: "2021-06-22T10:02:48.000+00:00",
      modifiedBy: 4,
      name: "Nile Home",
      projectListLength: 7,
      resourceListLength: 30,
      role: "EDIT",
    },
  ];

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

  return (
    <ThemeProvider theme={theme}>
      {" "}
      <Typography variant="h1" style={{ marginBottom: "10px" }}>
        Workspaces
      </Typography>
      <Grid container spacing={5} className={classes.container}>
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
            />
          </Paper>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

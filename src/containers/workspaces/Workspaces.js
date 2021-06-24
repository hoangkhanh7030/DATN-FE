import {
  Grid,
  Typography,
  Paper,
  IconButton,
  ThemeProvider,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React from "react";
import { theme } from "../../assets/css/Common";
import Workspace from "../../components/workspace/Workspace";
import { useStyles } from "./style";

export default function Workspaces() {
  const classes = useStyles();

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

  return (
    <ThemeProvider theme={theme}>
      {" "}
      <Typography variant="h1" gutterBottom>
        Workspaces
      </Typography>
      <Grid container spacing={5} className={classes.container}>
        {workspaces.map((workspace) => (
          <Grid item xs={12} sm={4} md={3}>
            <Workspace key={workspace.key} workspace={workspace} />
          </Grid>
        ))}
        <Grid item xs={12} sm={4} md={3}>
          <Paper className={classes.paper}>
            <IconButton>
              <AddIcon className={classes.addIcon} gutterBottom />
            </IconButton>
            <Typography variant="h3" className={classes.newWorkspace}>
              NEW WORKSPACE
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

import { ThemeProvider, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { theme } from "../../assets/css/Common";
import { useStyles } from "./style";

export default function Workspace() {
  const classes = useStyles();
  const { id } = useParams();

  return (
    <ThemeProvider theme={theme}>
      {" "}
      <Typography variant="h1" style={{ marginBottom: "10px" }}>
        Workspace {id}
      </Typography>
    </ThemeProvider>
  );
}

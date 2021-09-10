import { ThemeProvider, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUsers } from "redux/actions/userAction";
import { theme } from "../../assets/css/Common";
import { useStyles } from "./style";

export default function Workspace() {
  const classes = useStyles();
  const { id } = useParams();

  const dispatch = useDispatch();

  const storeUsers = useSelector((state) => state.users);
  const [isAccess, setIsAccess] = useState(true);

  const params = {
    page: 1,
    size: 100,
    searchName: "",
    sortName: "",
    type: false,
  };
  useEffect(() => {
    dispatch(getUsers(id, params));
  }, [id]);

  useEffect(() => {
    if (!storeUsers.data) {
      return;
    }
    const tmp = storeUsers.data.map((item) => item.id);
    tmp.push(storeUsers.adminId);
    const accountId = JSON.parse(localStorage.getItem("user")).accountDTO.id;

    setIsAccess(tmp.includes(accountId));
  }, [storeUsers.data]);

  return (
    <ThemeProvider theme={theme}>
      {" "}
      <Typography variant="h1">Workspace {id}</Typography>
      {!storeUsers.isLoading ? (
        <Typography variant="h1">
          {!isAccess ? "Your invitation is expired" : ""}
        </Typography>
      ) : (
        <></>
      )}
    </ThemeProvider>
  );
}

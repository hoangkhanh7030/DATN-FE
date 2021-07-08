import { ThemeProvider } from "@material-ui/core";
import { theme } from "assets/css/Common";
import { INITIAL_PAGE, INITIAL_ROWS_PER_PAGE } from "constants/index";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ResourcesTable from "./table/Table";
import TableFooter from "./table/TableFooter";
import TableToolbar from "./table/TableToolbar";

export default function Resources() {
  const { id } = useParams();

  const [resources, setResources] = useState([
    {
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/hr-resourcing-app-10cd0.appspot.com/o/images%2F20210522_052222.jpg?alt=media&token=7313fe56-77ed-4567-9bd6-c37769a41c69",
      createdBy: 15,
      createdDate: "2021-07-24T10:12:01.516+00:00",
      id: 151,
      listTime: [],
      modifiedBy: 15,
      modifiedDate: "2021-07-24T10:12:01.516+00:00",
      name: "Tim",
      positionDTO: {
        id: 12,
        name: "Manager",
        teamDTO: { id: 44, name: "QA", workspaceDTO: null, positionDTOS: null },
      },
    },
  ]);

  const [page, setPage] = useState(INITIAL_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState(INITIAL_ROWS_PER_PAGE);

  const [pageSize, setPageSize] = useState(1);

  return (
    <ThemeProvider theme={theme}>
      <TableToolbar />
      <ResourcesTable data={resources} />
      <TableFooter page={page} rowsPerPage={rowsPerPage} pageSize={pageSize} />
    </ThemeProvider>
  );
}

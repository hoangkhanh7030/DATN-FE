import { ThemeProvider } from "@material-ui/core";
import { theme } from "assets/css/Common";
import { Message } from "components/common/Message";
import {
  ASC,
  DESC,
  INITIAL_PAGE,
  INITIAL_ROWS_PER_PAGE,
  SIZE_OPTION,
  STATUS,
  STATUS_OPTION,
} from "constants/index";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearMessage } from "redux/actions/msgAction";
import { getResources } from "redux/actions/resourceAction";
import ResourcesTable from "./table/Table";
import TableFooter from "./table/TableFooter";
import TableToolbar from "./table/TableToolbar";

export default function Resources() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [resources, setResources] = useState([]);
  const storeResources = useSelector((state) => state.resources);

  const { message } = useSelector((state) => state.message);
  const [openMessage, setOpenMessage] = useState(false);

  const [page, setPage] = useState(INITIAL_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState(INITIAL_ROWS_PER_PAGE);

  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState(STATUS);
  const [order, setOrder] = useState(false);
  const [orderBy, setOrderBy] = useState("");

  const setResourceParams = (
    keywordParam,
    pageParam = page,
    sizeParam = rowsPerPage,
    sortColumnParam = orderBy,
    typeParam = order
  ) => {
    return {
      page: pageParam - 1,
      size: sizeParam,
      sortColumn: sortColumnParam,
      keyword: keywordParam,
      type: typeParam ? ASC : DESC,
      teamName: "",
      posName: "",
    };
  };

  const fetchResources = (resourceParams) => {
    dispatch(getResources(id, resourceParams));
  };

  useEffect(() => {
    dispatch(clearMessage());
    const resourceParams = setResourceParams(
      keyword,
      page,
      rowsPerPage,
      orderBy,
      order,
      status
    );
    fetchResources(resourceParams);
  }, [dispatch, page, rowsPerPage, orderBy, order, status]);

  useEffect(() => {
    if (!storeResources.data) {
      return;
    }

    setResources(storeResources.data);
  }, [storeResources.data]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setPage(INITIAL_PAGE);
      const resourceParams = setResourceParams(keyword, INITIAL_PAGE);
      fetchResources(resourceParams);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [keyword]);

  const cancelSearch = () => {
    setKeyword("");
  };

  const handleSort = (orderBy) => {
    setOrderBy(orderBy);
    setOrder(!order);
  };

  const handleCloseMessage = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenMessage(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeDropdown = (e) => {
    setPage(INITIAL_PAGE);
    const { name, value } = e.target;

    if (name === STATUS_OPTION) setStatus(value);
    if (name === SIZE_OPTION) setRowsPerPage(value);

    return;
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, resources.length);

  return (
    <ThemeProvider theme={theme}>
      <TableToolbar
        keyword={keyword}
        setKeyword={setKeyword}
        cancelSearch={cancelSearch}
        status={status}
        handleChangeDropdown={handleChangeDropdown}
      />
      <ResourcesTable
        data={resources}
        emptyRows={emptyRows}
        handleSort={handleSort}
        isLoading={storeResources.isLoading}
      />
      <TableFooter
        page={page}
        rowsPerPage={rowsPerPage}
        pageSize={storeResources.pageSize}
        handleChangePage={handleChangePage}
        handleChangeDropdown={handleChangeDropdown}
      />
      {message && (
        <Message
          message={message}
          isOpen={openMessage}
          handleCloseMessage={handleCloseMessage}
          type={storeResources.status === 200 ? "success" : "error"}
        />
      )}
    </ThemeProvider>
  );
}

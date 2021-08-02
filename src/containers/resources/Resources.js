import { ThemeProvider } from "@material-ui/core";
import { theme } from "assets/css/Common";
import { Message } from "components/common/Message";
import {
  ASC,
  DESC,
  IMAGES_URL,
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
import { getResources, addResource } from "redux/actions/resourceAction";
import { getTeams } from "redux/actions/teamAction";
import { GET_RESOURCES, SET_MESSAGE } from "redux/constants";
import * as _ from "underscore";
import ResourceDialog from "./dialog/ResourceDialog";
import ResourcesTable from "./table/Table";
import TableFooter from "./table/TableFooter";
import TableToolbar from "./table/TableToolbar";
import { storage } from "../../firebase";

const INITIAL_RESOURCE = {
  avatar: "",
  name: "",
  teamId: "",
  positionId: "",
};

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

  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [resourceId, setResourceId] = useState(null);
  const [resource, setResource] = useState(null);

  const storeTeams = useSelector((state) => state.teams);

  const handleOpenDialog = (resource = null) => {
    setResource(
      resource
        ? {
            avatar: _.get(resource, "avatar"),
            name: _.get(resource, "name"),
            teamId: _.get(resource, ["positionDTO", "teamDTO", "id"]),
            positionId: _.get(resource, ["positionDTO", "id"]),
          }
        : INITIAL_RESOURCE
    );
    setResourceId(resource ? _.get(resource, "id") : null);
    setIsOpenDialog(true);
  };

  const setResourceParams = (
    keywordParam = keyword,
    pageParam = page,
    sizeParam = rowsPerPage,
    sortColumnParam = orderBy,
    typeParam = order,
    isArchivedParam = status
  ) => {
    return {
      page: pageParam - 1,
      size: sizeParam,
      sortColumn: sortColumnParam,
      keyword: keywordParam,
      type: typeParam ? ASC : DESC,
      isArchived: isArchivedParam === STATUS ? "" : status,
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
    dispatch(getTeams(id));
  }, [dispatch, id, page, rowsPerPage, orderBy, order, status]);

  useEffect(() => {
    if (!storeResources.data) {
      return;
    }

    setResources(storeResources.data);
  }, [storeResources.data]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      page === INITIAL_PAGE
        ? fetchResources(setResourceParams())
        : setPage(INITIAL_PAGE);
    }, 1000);

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

  const callApiAddResource = (id, resource) => {
    dispatch(addResource(id, resource))
      .then(() => {
        dispatch({
          type: GET_RESOURCES,
        });
        window.location.reload();
      })
      .catch(() => {
        setOpenMessage(true);
      });
  };

  const getUploadedImageUrl = async (avatarFile) => {
    return new Promise((resolve, reject) => {
      const uploadTask = storage
        .ref(`${IMAGES_URL}${avatarFile.name}`)
        .put(avatarFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          dispatch({
            type: SET_MESSAGE,
            payload: error,
          });
          reject(error);
        },
        async () => {
          const imgURL = await uploadTask.snapshot.ref.getDownloadURL();
          resolve(imgURL);
          return imgURL;
        }
      );
    });
  };

  const handleReset = () => {
    setKeyword("");
    setStatus(STATUS);
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
        handleOpenDialog={handleOpenDialog}
        handleReset={handleReset}
      />
      <ResourcesTable
        data={resources}
        emptyRows={emptyRows}
        handleSort={handleSort}
        isLoading={storeResources.isLoading}
        handleOpenDialog={handleOpenDialog}
      />
      <TableFooter
        page={page}
        rowsPerPage={rowsPerPage}
        pageSize={storeResources.pageSize}
        handleChangePage={handleChangePage}
        handleChangeDropdown={handleChangeDropdown}
      />
      {!resource ? (
        <></>
      ) : (
        <ResourceDialog
          isOpenDialog={isOpenDialog}
          resource={resource}
          resourceId={resourceId}
          teams={storeTeams.data || []}
          setResource={setResource}
          setIsOpenDialog={setIsOpenDialog}
          callApiAddResource={callApiAddResource}
          getUploadedImageUrl={getUploadedImageUrl}
        />
      )}
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

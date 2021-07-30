import { ThemeProvider } from "@material-ui/core";
import { theme } from "assets/css/Common";
import { Message } from "components/common/Message";
import {
  ASC,
  DEFAULT_RESOURCE,
  DESC,
  IMAGES_URL,
  INITIAL_PAGE,
  INITIAL_ROWS_PER_PAGE,
  SIZE_OPTION,
  STATUS,
  STATUS_OPTION
} from "constants/index";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearMessage, setMessage } from "redux/actions/msgAction";
import {
  addResource, archiveResource, deleteResource, editResource, exportResources, getResources, importResources
} from "redux/actions/resourceAction";
import { getTeams } from "redux/actions/teamAction";
import { GET_RESOURCES, SET_MESSAGE } from "redux/constants";
import * as _ from "underscore";
import { storage } from "../../firebase";
import ResourceDialog from "./dialog/ResourceDialog";
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

  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [resourceId, setResourceId] = useState(null);
  const [resource, setResource] = useState(null);

  const storeTeams = useSelector((state) => state.teams);

  const [isUploading, setIsUploading] = useState(false);

  const [errorImport, setErrorImport] = useState(false);

  const handleOpenDialog = (resource = null) => {
    setResource(
      resource
        ? {
            avatar: _.get(resource, "avatar"),
            name: _.get(resource, "name"),
            teamId: _.get(resource, ["positionDTO", "teamDTO", "id"]),
            positionId: _.get(resource, ["positionDTO", "id"]),
          }
        : DEFAULT_RESOURCE
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
        setOpenMessage(true);
      })
      .catch(() => {
        setOpenMessage(true);
      });
  };

  const callApiEditResource = (id, resourceId, resource) => {
    dispatch(editResource(id, resourceId, resource))
      .then(() => {
        fetchResources(setResourceParams());
        setOpenMessage(true);
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
        (snapshot) => {
          setIsUploading(true);
        },
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
          setIsUploading(false);
          return imgURL;
        }
      );
    });
  };

  const handleReset = () => {
    setKeyword("");
    setStatus(STATUS);
  };

  const handelDeleteResource = (resourceId) => {
    dispatch(deleteResource(id, resourceId))
      .then(() => {
        fetchResources(setResourceParams());
        setOpenMessage(true);
      })
      .catch(() => {
        setOpenMessage(true);
      });
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, resources.length);

  const handleExportResources = () => {
    dispatch(exportResources(id));
  };

  const handleImportResources = (file) => {
    if (file.type === "application/vnd.ms-excel") {
      dispatch(importResources(id, file))
        .then(() => {
          fetchResources(setResourceParams());

          setOpenMessage(true);
        })
        .catch(() => {
          setOpenMessage(true);
        });
    } else {
      dispatch(setMessage("Wrong type of file. Please choose csv file!"));
      setErrorImport(true);
      setOpenMessage(true);
      setErrorImport(false);
    }
  };

  const callApiArchiveResource = (projectId) => {
    dispatch(archiveResource(id, projectId))
      .then(() => {
        dispatch(fetchResources(setResourceParams())).catch(() => {
          setOpenMessage(true);
        });
        setOpenMessage(true);
      })
      .catch(() => {
        setOpenMessage(true);
      });
  };

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
        handleExportResources={handleExportResources}
        handleImportResources={handleImportResources}
      />
      <ResourcesTable
        data={resources}
        emptyRows={emptyRows}
        handleSort={handleSort}
        isLoading={storeResources.isLoading || isUploading}
        handleOpenDialog={handleOpenDialog}
        handelDeleteResource={handelDeleteResource}
        callApiArchiveResource={callApiArchiveResource}
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
          callApiEditResource={callApiEditResource}
        />
      )}
      {!message ? (
        <></>
      ) : (
        <Message
          message={message}
          isOpen={openMessage}
          handleCloseMessage={handleCloseMessage}
          type={
            storeResources.status === 200 && !errorImport ? "success" : "error"
          }
        />
      )}
    </ThemeProvider>
  );
}

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
  STATUS_OPTION,
} from "constants/index";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearMessage, setMessage } from "redux/actions/msgAction";
import {
  addResource,
  archiveResource,
  deleteResource,
  editResource,
  exportResources,
  getResources,
  importResources,
} from "redux/actions/resourceAction";
import { getTeams } from "redux/actions/teamAction";
import { SET_MESSAGE } from "redux/constants";
import * as _ from "underscore";
import { storage } from "../../firebase";
import ResourceDialog from "./dialog/ResourceDialog";
import ResourcesTable from "./table/Table";
import TableFooter from "./table/TableFooter";
import TableToolbar from "./table/TableToolbar";
import SettingDialog from "./dialog/SettingDialog";
import { Progress } from "components/common/Progress";

const DEFAULT_PARAMS = {
  page: INITIAL_PAGE,
  size: INITIAL_ROWS_PER_PAGE,
  keyword: "",
  sortColumn: "",
  type: false,
  isArchived: STATUS,
};

export default function Resources() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [resources, setResources] = useState([]);
  const storeResources = useSelector((state) => state.resources);

  const { message } = useSelector((state) => state.message);
  const [openMessage, setOpenMessage] = useState(false);

  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [resourceId, setResourceId] = useState(null);
  const [resource, setResource] = useState(null);

  const storeTeams = useSelector((state) => state.teams);

  const [isUploading, setIsUploading] = useState(false);

  const [errorImport, setErrorImport] = useState(false);

  const [params, setParams] = useState(DEFAULT_PARAMS);

  const [openSettingsDialog, setOpenSettingsDialog] = useState(false);

  const [isCallApi, setIsCallApi] = useState(false);

  const handleOpenDialog = (resource = null) => {
    setResource(
      resource
        ? {
            avatar: _.get(resource, "avatar"),
            name: _.get(resource, "name"),
            teamId: _.get(resource, ["positionDTO", "teamDTO", "id"]),
            positionId: _.get(resource, ["positionDTO", "id"]),
            team: _.get(resource, ["positionDTO", "teamDTO", "name"]),
            position: _.get(resource, ["positionDTO", "name"]),
          }
        : DEFAULT_RESOURCE
    );
    setResourceId(resource ? _.get(resource, "id") : null);
    setIsOpenDialog(true);
  };

  const fetchResources = () => {
    const data = {
      ...params,
      page: params.page - 1,
      type: params.type ? ASC : DESC,
      isArchived: params.isArchived === STATUS ? "" : params.isArchived,
    };
    dispatch(getResources(id, data));
  };

  useEffect(() => {
    dispatch(clearMessage());
    fetchResources();
    dispatch(getTeams(id));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id, params]);

  useEffect(() => {
    if (!storeResources.data) {
      return;
    }

    setResources(storeResources.data);
  }, [storeResources.data]);

  useEffect(() => {
    if (storeTeams.data) {
      setIsCallApi(true);
    }
  }, [storeTeams.data]);

  const handleCloseSettingsDialog = () => {
    fetchResources();
    setOpenSettingsDialog(false);
    dispatch(getTeams(id));
    setIsCallApi(false);
  };

  const handleOpenSettingsDialog = () => {
    setOpenSettingsDialog(true);
  };

  const keyUp = (event) => {
    const value = event.target.value;
    if (event.keyCode === 13 || value === "") {
      if (value !== params.keyword)
        setParams({
          ...params,
          keyword: value,
          page: INITIAL_PAGE,
        });
    }
  };

  const cancelSearch = () => {
    setParams({ ...params, keyword: "" });
  };

  const handleSort = (orderBy) => {
    setParams({ ...params, sortColumn: orderBy, type: !params.type });
  };

  const handleCloseMessage = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenMessage(false);
  };

  const handleChangePage = (event, newPage) => {
    setParams({ ...params, page: newPage });
  };

  const handleChangeDropdown = (e) => {
    const { name, value } = e.target;
    if (name === SIZE_OPTION)
      setParams({ ...params, page: INITIAL_PAGE, size: value });

    if (name === STATUS_OPTION)
      setParams({ ...params, page: INITIAL_PAGE, isArchived: value });
    return;
  };

  const handleReset = () => {
    setParams(DEFAULT_PARAMS);
  };

  const callApiAddResource = (id, resource) => {
    dispatch(addResource(id, resource))
      .then(() => {
        setOpenMessage(true);
        params === DEFAULT_PARAMS ? fetchResources() : handleReset();
      })
      .catch(() => {
        setOpenMessage(true);
      });
  };

  const callApiEditResource = (id, resourceId, resource) => {
    dispatch(editResource(id, resourceId, resource))
      .then(() => {
        setOpenMessage(true);
        fetchResources();
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

  const handelDeleteResource = (resourceId) => {
    dispatch(deleteResource(id, resourceId))
      .then(() => {
        setOpenMessage(true);
        if (_.size(resources) === 1)
          setParams({
            ...params,
            page: params.page - 1,
          });
        else fetchResources();
      })
      .catch(() => {
        setOpenMessage(true);
      });
  };

  const emptyRows = params.size - Math.min(params.size, resources.length);

  const handleExportResources = () => {
    dispatch(exportResources(id));
  };

  const handleImportResources = (file) => {
    if (file.type === "application/vnd.ms-excel") {
      dispatch(importResources(id, file))
        .then(() => {
          handleReset();
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
        fetchResources();
        setOpenMessage(true);
      })
      .catch(() => {
        setOpenMessage(true);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      {!storeTeams.data ? (
        <></>
      ) : (
        <SettingDialog
          open={
            isCallApi && (storeTeams.data?.length === 0 || openSettingsDialog)
          }
          isObligated={storeTeams.data?.length === 0}
          teamsPositions={storeTeams.data || []}
          handleCloseSettingsDialog={handleCloseSettingsDialog}
          setOpenSettingsDialog={setOpenSettingsDialog}
          type={storeTeams.data?.length > 0 ? "put" : "post"}
        />
      )}

      <TableToolbar
        keyword={params.keyword}
        cancelSearch={cancelSearch}
        status={params.isArchived}
        keyUp={keyUp}
        handleChangeDropdown={handleChangeDropdown}
        handleOpenDialog={handleOpenDialog}
        handleReset={handleReset}
        handleExportResources={handleExportResources}
        handleImportResources={handleImportResources}
        handleSettingsDialog={handleOpenSettingsDialog}
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
        page={params.page}
        rowsPerPage={params.size}
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
            storeResources.status === 200 || storeTeams.status === 200
              ? "success"
              : "error"
          }
        />
      )}
      <Progress isOpen={storeTeams?.isLoading} />
    </ThemeProvider>
  );
}

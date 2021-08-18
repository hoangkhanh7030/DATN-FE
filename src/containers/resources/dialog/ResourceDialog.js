import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  InputBase,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@material-ui/core";
import AvatarUpload from "components/common/AvatarUpload";
import { HelperText } from "components/common/HelperText";
import { POSITION_ID, RESOURCE_NAME, TEAM_ID } from "constants/index";
import { MenuProps } from "containers/layouts/header/style";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as _ from "underscore";
import { DialogTitle, Placeholder } from "./Common";
import { useStyles } from "./style";

export default function ResourceDialog(props) {
  const {
    isOpenDialog = false,
    resource,
    resourceId,
    teams,
    setResource,
    setIsOpenDialog,
    callApiAddResource,
    getUploadedImageUrl,
    callApiEditResource,
  } = props;
  const { id } = useParams();

  const classes = useStyles();

  const [invalidName, setInvalidName] = useState("");
  const [invalidTeam, setInvalidTeam] = useState("");
  const [invalidPosition, setInvalidPosition] = useState("");

  const [avatarFile, setAvatarFile] = useState(null);

  const [positions, setPositions] = useState(null);

  const hasSelectedValue = (value) => {
    return value !== "";
  };

  const getInvalidValue = ({ name, value }) => {
    return !value && [RESOURCE_NAME, TEAM_ID, POSITION_ID].includes(name)
      ? name
      : "";
  };

  useEffect(() => {
    if (hasSelectedValue(_.get(resource, "teamId"))) {
      const selectedTeam = teams.find(
        (item) => item.id === _.get(resource, "teamId")
      );
      setPositions(selectedTeam.positions);
      const isEdit = selectedTeam.positions.some(
        (e) => e.id === _.get(resource, "positionId")
      );
      setResource({
        ...resource,
        positionId: isEdit ? _.get(resource, "positionId") : "",
      });
    }
  }, [_.get(resource, "teamId"), teams]);

  const handleChange = (event) => {
    setInvalidName(getInvalidValue(event.target));
    setInvalidTeam(getInvalidValue(event.target));
    setInvalidPosition(getInvalidValue(event.target));
    setResource({ ...resource, [event.target.name]: event.target.value });
  };

  const handleCloseDialog = () => {
    setAvatarFile(null);
    setIsOpenDialog(false);
    setInvalidName("");
    setInvalidTeam("");
    setInvalidPosition("");
  };

  const hasEmptyValue = (value) => {
    return value === "";
  };

  // handle submit dialog
  const handleSubmitDialog = async () => {
    setInvalidName(
      hasEmptyValue(_.get(resource, "name")) ? RESOURCE_NAME : null
    );
    setInvalidTeam(hasEmptyValue(_.get(resource, "teamId")) ? TEAM_ID : null);
    setInvalidPosition(
      hasEmptyValue(_.get(resource, "positionId")) ? POSITION_ID : null
    );

    if (
      hasEmptyValue(_.get(resource, "name")) ||
      hasEmptyValue(_.get(resource, "teamId")) ||
      hasEmptyValue(_.get(resource, "positionId"))
    )
      return;
    handleCloseDialog();
    const updatedResource = {
      ...resource,
      avatar: avatarFile
        ? await getUploadedImageUrl(avatarFile)
        : _.get(resource, "avatar"),
    };

    resourceId
      ? callApiEditResource(id, resourceId, updatedResource)
      : callApiAddResource(id, updatedResource);
  };

  return (
    <Dialog
      open={isOpenDialog}
      onClose={handleCloseDialog}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle id="form-dialog-title" onClose={handleCloseDialog}>
        {resourceId ? "Edit Resource" : "Create Resource"}
      </DialogTitle>
      <DialogContent>
        <Box>
          <AvatarUpload
            avatar={_.get(resource, "avatar")}
            setAvatarFile={setAvatarFile}
            resource={resource}
            setResource={setResource}
          />
        </Box>
        <Paper
          className={`${classes.paper} ${
            invalidName === RESOURCE_NAME ? classes.invalidBorder : null
          }`}
          elevation={0}
        >
          <Typography variant="h4">
            RESOURCE NAME <span className={classes.obligatedText}>*</span>
          </Typography>
          <InputBase
            name="name"
            defaultValue={_.get(resource, "name")}
            margin="dense"
            placeholder="Resource Name"
            onChange={handleChange}
            fullWidth
            autoComplete="off"
          />
        </Paper>
        <HelperText errorName={RESOURCE_NAME} errorValue={invalidName} />

        <Paper
          className={`${classes.paper} ${
            invalidTeam === TEAM_ID ? classes.invalidBorder : null
          }`}
          elevation={0}
        >
          <Typography variant="h4">
            TEAM <span className={classes.obligatedText}>*</span>
          </Typography>
          {teams.length === 0 ? (
            <Typography className={classes.text}>Please add teams</Typography>
          ) : (
            <FormControl fullWidth>
              <Select
                name="teamId"
                fullWidth
                classes={{ root: classes.selectRoot }}
                value={_.get(resource, "teamId")}
                onChange={handleChange}
                displayEmpty
                MenuProps={MenuProps}
                disableUnderline
                renderValue={
                  hasSelectedValue(_.get(resource, "teamId"))
                    ? undefined
                    : () => <Placeholder>Select a team</Placeholder>
                }
              >
                {teams.map((team) => (
                  <MenuItem key={team.id} value={team.id}>
                    {team.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Paper>
        <HelperText errorName={TEAM_ID} errorValue={invalidTeam} />

        {hasEmptyValue(_.get(resource, "teamId")) ? (
          <></>
        ) : (
          <>
            <Paper
              className={`${classes.paper} ${
                invalidPosition === POSITION_ID ? classes.invalidBorder : null
              }`}
              elevation={0}
            >
              <Typography variant="h4">
                POSITION <span className={classes.obligatedText}>*</span>
              </Typography>

              <FormControl fullWidth>
                {!positions || positions?.length === 0 ? (
                  <Typography className={classes.text}>
                    Please add positions
                  </Typography>
                ) : (
                  <Select
                    name="positionId"
                    fullWidth
                    classes={{ root: classes.selectRoot }}
                    value={_.get(resource, "positionId")}
                    onChange={handleChange}
                    displayEmpty
                    MenuProps={MenuProps}
                    disableUnderline
                    renderValue={
                      hasSelectedValue(_.get(resource, "positionId"))
                        ? undefined
                        : () => <Placeholder>Select a position</Placeholder>
                    }
                  >
                    {positions.map((position) => (
                      <MenuItem key={position.id} value={position.id}>
                        {position.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              </FormControl>
            </Paper>
            <HelperText errorName={POSITION_ID} errorValue={invalidPosition} />
          </>
        )}
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button onClick={handleCloseDialog} variant="outlined">
          Cancel
        </Button>
        <Button
          color="primary"
          variant="contained"
          disableElevation
          onClick={handleSubmitDialog}
        >
          {resourceId ? "Update" : "Confirm"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

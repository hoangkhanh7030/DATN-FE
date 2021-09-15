import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  ThemeProvider,
} from "@material-ui/core";
import { theme } from "assets/css/Common";
import { Message } from "components/common/Message";
import { Progress } from "components/common/Progress";
import { EmptyData } from "components/resources/EmptyData";
import { SettingHeader } from "components/resources/SettingHeader";
import { SettingTitle } from "components/resources/SettingTitle";
import { EMPTY_ERROR, WORKSPACES_URL } from "constants/index";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { setMessage } from "redux/actions/msgAction";
import { addTeams, getTeams, updateTeams } from "redux/actions/teamAction";
import SettingRow from "./SettingRow";
import { useStyles } from "./style";

const INITIAL_ROW = {
  name: "",
  positions: [],
  error: { team: null, position: null },
  // error: { team: EMPTY_ERROR, position: EMPTY_ERROR },
};

export default function SettingsDialog(props) {
  const classes = useStyles();
  const {
    open = false,
    isObligated,
    teamsPositions,
    handleCloseSettingsDialog,
    setOpenSettingsDialog,
    type,
  } = props;
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const { message } = useSelector((state) => state.message);
  const [isOpenMessage, setIsOpenMessage] = useState(false);

  const [data, setData] = useState([]);

  const storeTeams = useSelector((state) => state.teams);

  const [error, setError] = useState({ team: "", position: "" });

  useEffect(() => {
    if (!teamsPositions) {
      return;
    }
    const customizedData = teamsPositions.map((item) => ({
      ...item,
      positions: item.positions.map((i) => ({ ...i, isEdit: false })),
      error: {
        team: item.name === "" ? true : false,
        position: Object.keys(item.positions).length === 0 ? true : false,
      },
      // error: {
      //   team: item.name === "" ? EMPTY_ERROR : "",
      //   position: Object.keys(item.positions).length === 0 ? EMPTY_ERROR : "",
      // },
    }));
    setData(customizedData);
  }, [teamsPositions]);

  const isValidForm = () => {
    return !(
      data.findIndex((e) => e.name === "" || e.positions.length === 0) + 1
    );
  };

  const handleAddRow = () => {
    setData([...data, INITIAL_ROW]);
  };

  const handleDeleteRow = (index) => {
    const newData = [...data.filter((item, i) => i !== index)];
    setData(newData);
  };

  const handleChangeRow = (row = INITIAL_ROW, index) => {
    const updatedData = [...data.map((item, i) => (i === index ? row : item))];
    setData(updatedData);
  };

  const handleSubmit = () => {
    if (!isValidForm()) {
      const tmp = [...data];
      tmp.forEach((item) => {
        item.error = {
          ...item.error,
          team: !item.name,
          position: !item.positions.length,
        };
      });

      setData(tmp);
      return;
    }

    const newData = data.map((item) => ({
      ...item,
      positions: item.positions.map((item) =>
        item.id === undefined
          ? { name: item.name }
          : { id: item.id, name: item.name }
      ),
    }));

    setOpenSettingsDialog(false);

    if (type === "post") {
      dispatch(addTeams(id, newData)).then(() => {
        handleCloseSettingsDialog();
        dispatch(getTeams(id));
      });
    } else {
      dispatch(updateTeams(id, newData)).then(() => {
        handleCloseSettingsDialog();
        dispatch(getTeams(id));
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Dialog open={open} maxWidth="md" fullWidth scroll="paper">
        <SettingTitle handleAddRow={handleAddRow} />
        <DialogContent className={classes.settingsContent}>
          <SettingHeader />
          {data.length > 0 ? (
            data.map((item, index) => (
              <SettingRow
                key={index}
                data={item}
                index={index}
                handleDeleteRow={handleDeleteRow}
                handleChangeRow={handleChangeRow}
                error={error}
              />
            ))
          ) : (
            <EmptyData />
          )}
        </DialogContent>

        <DialogActions className={classes.dialogActions}>
          <Button
            onClick={() => {
              if (type === "post") {
                history.push(`${WORKSPACES_URL}/${id}`);
                dispatch(
                  setMessage(
                    "You must set team and position before managing resources!",
                    true
                  )
                );
              } else {
                setOpenSettingsDialog(false);
                // dispatch(getTeams(id));
                setData(storeTeams.data);
              }
            }}
            color="primary"
          >
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disableElevation
            disabled={
              storeTeams.isLoading ||
              (type === "post" && data.length === 0) ||
              !isValidForm()
            }
          >
            {type === "put" ? "Update" : "Confirm"}
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

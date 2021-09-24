import { Chip, Grid, IconButton, TextField, Tooltip } from "@material-ui/core";
import { EMPTY_ERROR } from "constants/index";
import ChipInput from "material-ui-chip-input";
import React, { useState } from "react";
import { useStyles } from "./style";

export default function SettingsRow(props) {
  const { data, index, handleDeleteRow, handleChangeRow } = props;

  const classes = useStyles();

  const [error, setError] = useState(data.error);

  const onChangeRow = (event) => {
    let newErr = { ...data.error };
    if (event.target.value === "") {
      setError({ ...error, team: true });
      newErr = { ...data.error, team: true };
      handleChangeRow(
        { ...data, name: event.target.value, error: newErr },
        index
      );
    } else {
      setError({ ...error, team: false });
      newErr = { ...data.error, team: false };
    }
    handleChangeRow(
      { ...data, name: event.target.value, error: newErr },
      index
    );
  };

  const handleAddChip = (chip) => {
    const newPos = [...data.positions, { name: chip, isEdit: false }];
    let newErr = { ...data.error, position: newPos.length === 0 };

    handleChangeRow({ ...data, positions: newPos, error: newErr }, index);
  };

  const handleDeleteChip = (chip, id) => {
    console.info(`You delete a Chip. ${id}`, chip);
    const newPos = data.positions.filter((chip, i) => i !== id);
    let newErr = { ...data.error, position: newPos.length === 0 };

    handleChangeRow({ ...data, positions: newPos, error: newErr }, index);
  };

  return (
    <Grid container spacing={3} className={classes.alignCenter}>
      <Grid item xs={1} align="center" style={{ paddingRight: 0 }}>
        <Tooltip title="Delete">
          <IconButton
            className={`far fa-trash-alt`}
            onClick={() => handleDeleteRow(index)}
          />
        </Tooltip>
      </Grid>
      <Grid item xs={3}>
        <TextField
          name={`team-${index}`}
          variant="outlined"
          placeholder="Name"
          fullWidth
          value={data.name}
          onChange={onChangeRow}
          autoComplete="off"
          style={{ height: 56 }}
          FormHelperTextProps={{
            className: classes.helperText,
          }}
          {...(data.error?.team && {
            error: true,
            helperText: EMPTY_ERROR,
          })}
        />
      </Grid>
      <Grid item xs={8}>
        <ChipInput
          classes={{
            root: classes.root,
            chipContainer: classes.chipContainer,
            inputRoot: classes.inputRoot,
            input: classes.input,
            helperText: classes.helperText,
          }}
          // key={index}
          name={`position-${index}`}
          variant="outlined"
          autoFocus
          // margin="dense"
          value={data.positions?.map((item) => item.name)}
          fullWidth
          blurBehavior="add"
          placeholder={"Type here to add a new position"}
          {...(data.error?.position && {
            error: true,
            helperText: EMPTY_ERROR,
          })}
          onAdd={(chip) => handleAddChip(chip)}
          onDelete={(chip, id) => handleDeleteChip(chip, id)}
          chipRenderer={(
            { value, text, chip, isFocused, isDisabled, handleDelete },
            key
          ) =>
            data.positions[key] ? (
              data.positions[key].isEdit ? (
                <input
                  key={key}
                  autoFocus
                  id={`${key}`}
                  size={text ? text.length : 1}
                  className={classes.customizedChip}
                  defaultValue={text}
                  onChange={(e) => {
                    let newPositions = [...data.positions];
                    newPositions[key].name = e.target.value;
                    handleChangeRow(
                      { ...data, positions: newPositions },
                      index
                    );
                  }}
                  onBlur={(e) => {
                    let newPositions = [...data.positions];
                    newPositions[key].isEdit = !newPositions[key].isEdit;

                    if (e.target.value === "") {
                      newPositions = newPositions.filter(
                        (item, i) => i !== key
                      );
                    }

                    let newErr = {
                      ...data.error,
                      position: newPositions.length === 0,
                    };

                    handleChangeRow(
                      { ...data, positions: newPositions, error: newErr },
                      index
                    );
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      let newPositions = [...data.positions];
                      newPositions[key].isEdit = !newPositions[key].isEdit;

                      let arr = [...newPositions];
                      if (e.target.value === "") {
                        arr = newPositions.filter((item, i) => i !== key);
                      }

                      let newErr = {
                        ...data.error,
                        position: arr.length === 0,
                      };

                      handleChangeRow(
                        { ...data, positions: arr, error: newErr },
                        index
                      );
                    }
                  }}
                />
              ) : (
                <Chip
                  key={key}
                  id={`${key}`}
                  label={text}
                  className={classes.chip}
                  onDelete={handleDelete}
                  // onDelete={(chips) => handleChangePosition(chips)}
                  onClick={(e) => {
                    // handleChangeRow(null, index);
                    let newPositions = [...data.positions];
                    newPositions.forEach((pos, index) => {
                      pos.isEdit = index === key;
                    });

                    handleChangeRow(
                      { ...data, positions: newPositions },
                      index
                    );
                  }}
                />
              )
            ) : (
              <></>
            )
          }
        />
      </Grid>
    </Grid>
  );
}

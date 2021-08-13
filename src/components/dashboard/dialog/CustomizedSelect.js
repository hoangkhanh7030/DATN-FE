import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  MenuList,
  Paper,
  Select,
  Typography,
} from "@material-ui/core";
import { HelperText } from "components/common/HelperText";
import { ProjectItem } from "components/dashboard/dialog/ProjectItem";
import { PROJECT_ID } from "constants/index";
import { Placeholder } from "components/dashboard/dialog/DialogTitle";
import { MenuProps } from "containers/workspace/dialog/style";
import SearchBar from "material-ui-search-bar";
import React from "react";
import { ResourceItem } from "./ResourceItem";

export const CustomizedSelect = (props) => {
  const {
    classes,
    name = PROJECT_ID,
    selectValue = "",
    items = [],
    searchName = "",
    setSearchName,
    handleChangeSelectItem,
    invalidStyle = "",
    errorName = "",
    errorValue = "",
  } = props;

  const title = name === PROJECT_ID ? "Project" : "Resource";

  const stopImmediatePropagation = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <>
      <Paper
        className={`${classes.dialogPaper} ${
          invalidStyle ? classes.invalidBorder : null
        }`}
        elevation={0}
      >
        <Typography variant="h4" className={classes.commonTitle}>
          {title.toUpperCase()} <span className={classes.obligatedText}>*</span>
        </Typography>

        <FormControl fullWidth>
          <Select
            name={name}
            fullWidth
            classes={{
              root: classes.selectRoot,
            }}
            value={selectValue}
            displayEmpty
            MenuProps={MenuProps}
            disableUnderline
            onClick={() => {
              setSearchName("");
            }}
            renderValue={
              !selectValue || !items?.length
                ? () => <Placeholder>{title}</Placeholder>
                : (value) =>
                    name === PROJECT_ID ? (
                      <ProjectItem
                        project={items.find((item) => item.id === value)}
                        isSelected={true}
                      />
                    ) : (
                      <ResourceItem
                        resource={items.find((item) => item.id === value)}
                        isSelected={true}
                      />
                    )
            }
          >
            <Grid
              container
              wrap="nowrap"
              spacing={1}
              className={classes.searchNewItem}
            >
              <Grid item xs zeroMinWidth>
                <SearchBar
                  value={searchName}
                  className={classes.searchbar}
                  onCancelSearch={(e) => {}}
                  onClickCapture={stopImmediatePropagation}
                  onKeyDown={(e) => e.stopPropagation()}
                  onChange={(e) => {
                    setSearchName(e);
                  }}
                />
              </Grid>
              <Grid item>
                <Button
                  color="primary"
                  variant="contained"
                  disableElevation
                  size="small"
                  onClick={(e) => {
                    stopImmediatePropagation(e);
                  }}
                >
                  New
                </Button>
              </Grid>
            </Grid>

            {!items?.length ? (
              <Box p={2} display="flex" justifyContent="center">
                <Typography className={classes.emptyDataText}>
                  No data
                </Typography>
              </Box>
            ) : (
              <MenuList className={classes.menuList}>
                {items?.map((item) => (
                  <MenuItem
                    key={item.id}
                    value={item.id}
                    onClick={() => handleChangeSelectItem(item.id, name)}
                    className={item.id === selectValue ? "Mui-selected" : ""}
                  >
                    {name === PROJECT_ID ? (
                      <ProjectItem
                        project={item}
                        hasIcon={item.id === selectValue}
                      />
                    ) : (
                      <ResourceItem
                        resource={item}
                        hasIcon={item.id === selectValue}
                      />
                    )}
                  </MenuItem>
                ))}
              </MenuList>
            )}
          </Select>
        </FormControl>
      </Paper>
      <HelperText errorName={errorName} errorValue={errorValue} />
    </>
  );
};

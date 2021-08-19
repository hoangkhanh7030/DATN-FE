import { Menu, MenuItem } from "@material-ui/core";

export default function TeamOptions({
  anchorEl,
  handleCloseOption,
  handleOpenRenameTeam,
  handleOpenDialog,
}) {
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleCloseOption}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      elevation={5}
    >
      <MenuItem key="new" value="new" onClick={handleOpenDialog}>
        add member
      </MenuItem>
      <MenuItem key="rename" value="rename" onClick={handleOpenRenameTeam}>
        rename
      </MenuItem>
    </Menu>
  );
}

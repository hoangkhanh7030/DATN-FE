import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { Pagination } from "@material-ui/lab";
import { INITIAL_PAGE, INITIAL_ROWS_PER_PAGE, SIZES } from "constants/index";
import { MenuProps, useFooterStyles } from "./style";
export default function TableFooter(props) {
  const classes = useFooterStyles();
  const {
    page = INITIAL_PAGE,
    rowsPerPage = INITIAL_ROWS_PER_PAGE,
    pageSize = 1,
    handleChangePage,
    handleChangeDropdown,
  } = props;

  return (
    <Box className={`${classes.root}`}>
      <Box className={classes.flex}>
        <Typography>SHOW</Typography>
        <FormControl variant="outlined" className={classes.selectInput}>
          <Select
            value={rowsPerPage}
            name={"size"}
            displayEmpty
            MenuProps={MenuProps}
            input={<OutlinedInput classes={{ input: classes.input }} />}
            onChange={handleChangeDropdown}
          >
            {SIZES.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography>ITEMS</Typography>
      </Box>
      <Box>
        <Pagination
          count={pageSize}
          variant="outlined"
          className={classes.pagination}
          shape="rounded"
          page={page}
          onChange={handleChangePage}
        />
      </Box>
    </Box>
  );
}

import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { Pagination } from "@material-ui/lab";
import { MenuProps, useFooterStyles } from "./style";
export default function TableFooter(props) {
  const classes = useFooterStyles();
  const { page, rowsPerPage, pageSize } = props;
  const pages = [5, 10, 15];

  return pageSize <= 0 ? (
    <></>
  ) : (
    <Box className={`${classes.root}`}>
      <Box className={classes.flex}>
        <Typography>SHOW</Typography>
        <FormControl variant="outlined" className={classes.selectInput}>
          <Select
            value={rowsPerPage}
            displayEmpty
            MenuProps={MenuProps}
            input={<OutlinedInput classes={{ input: classes.input }} />}
          >
            {pages.map((option) => (
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
        />
      </Box>
    </Box>
  );
}

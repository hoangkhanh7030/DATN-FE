import {
  Box,
  Grid,
  InputAdornment,
  InputBase,
  Typography,
} from "@material-ui/core";
import { PERCENTAGE } from "constants/index";
import { useStyles } from "containers/workspace/dialog/style";
import React from "react";
export default function TabPanel(props) {
  const {
    children,
    value = 0,
    index = 0,
    tabType = PERCENTAGE,
    handleChangeTabInput,
    days = 0,
  } = props;

  const isPercentage = () => {
    return tabType === PERCENTAGE;
  };

  const hourSum = isPercentage()
    ? (children / 100) * days * 8
    : children * days;

  const inputWidth = isPercentage() ? 80 : 150;
  const leftInputAdornment = isPercentage() ? 36 : 20;

  const classes = useStyles({ inputWidth, leftInputAdornment });

  const inputStyles = {
    min: isPercentage() ? 10 : 1,
    max: isPercentage() ? 100 : 8,
    step: isPercentage() ? 10 : 1,
    size: 1,
    width: 10,
    padding: 0,
    paddingtop: 1,
    fontSize: 16,
  };
  return (
    <div hidden={value !== index} id={`tab-panel-${index}`}>
      {value === index && (
        <Grid container>
          <Grid item xs={6}>
            <Box
              p={1}
              m={1}
              paddingLeft={2}
              display="flex"
              flexDirection="column"
              className={classes.utilization}
            >
              <Typography variant="h4" className={classes.commonTitle}>
                UTILIZATION <span className={classes.obligatedText}>*</span>
              </Typography>
              <InputBase
                name="name"
                value={parseInt(children).toFixed(1)}
                margin="dense"
                autoComplete="off"
                type="number"
                onChange={handleChangeTabInput}
                endAdornment={
                  <InputAdornment
                    position="end"
                    className={classes.inputAdornment}
                  >
                    <Typography variant="body1">
                      {isPercentage() ? "%" : "hours per day"}
                    </Typography>
                  </InputAdornment>
                }
                inputProps={inputStyles}
                className={classes.customizedInput}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              p={1}
              m={1}
              paddingLeft={2}
              display="flex"
              flexDirection="column"
              className={classes.hourTotal}
            >
              <Typography variant="h4" className={classes.commonTitle}>
                HOUR TOTAL
              </Typography>
              <Typography variant="body1">
                {hourSum.toFixed(1)} hours
              </Typography>
            </Box>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

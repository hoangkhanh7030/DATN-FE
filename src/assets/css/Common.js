import { makeStyles, createMuiTheme } from "@material-ui/core/styles";

/* -------------- colors ---------------------*/
export const primaryColor = "#3870F5";
export const secondaryColor = "#FFFFFF";
export const disabledColor = "#BCBCBC";
export const bgColor = "#F5F5F5";
export const ggColor = "#D63B30";
export const blackColor = "#000000";

/* ------------ common component styles -------*/
export const commonStyle = makeStyles(() => ({
  icon: {
    marginRight: "10px",
  },
  btn: {
    primary: {
      backgroundColor: primaryColor,
      color: secondaryColor,
    },
  },
}));

/* ----------- customized theme styles -------*/
export const theme = createMuiTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
  },
  typography: {
    h1: {
      fontSize: "24px",
      fontWeight: 600,
    },
    h2: {
      fontSize: "20px",
      fontWeight: 600,
    },
    h3: {
      fontSize: "16px",
    },
  },
});

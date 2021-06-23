import { makeStyles, createMuiTheme } from "@material-ui/core/styles";

/* -------------- colors ---------------------*/
export const primaryColor = "#3870F5";
export const secondaryColor = "#FFFFFF";
export const disabledColor = "#BCBCBC";
export const bgColor = "#F5F5F5";
export const ggColor = "#D63B30";

/* ------------ common component styles -------*/
export const commonStyle = makeStyles(() => ({
  icon: {
    marginRight: "10px",
  },
  btn: {
    primary: {
      backgroundColor: primaryColor,
    }
  }
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
    },
    h2: {
      fontSize: "20px",
    },
    h3: {
      fontSize: "18px",
    },
  }
});

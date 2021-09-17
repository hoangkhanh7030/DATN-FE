import { makeStyles, createMuiTheme } from "@material-ui/core/styles";

/* -------------- colors ---------------------*/
export const primaryColor = "#3870F5";
export const secondaryColor = "#FFFFFF";
export const disabledColor = "#BCBCBC";
export const bgColor = "#F5F5F5";
export const ggColor = "#D63B30";
export const blackColor = "#000000";
export const borderColor = "#E0E0E0";

/* ------------ common component styles -------*/
export const commonStyle = makeStyles(() => ({
  icon: {
    marginRight: "10px",
    color: primaryColor,
  },
  action: {
    marginRight: "10px",
    fontSize: "18px",
  },
  warning: {
    marginRight: "10px",
    color: ggColor,
  },
  ggicon: {
    marginRight: "10px",
  },
  gglink: {
    textDecoration: "none",
    color: secondaryColor,
  },
  btn: {
    primary: {
      backgroundColor: primaryColor,
      color: secondaryColor,
    },
  },
  a: {
    textDecoration: "none",
    color: blackColor,
  },
  helperText: {
    color: "#F44336",
    fontSize: "12px",
    padding: "5px 2px",
  },
}));

/* ----------- customized theme styles -------*/
export const theme = createMuiTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: ggColor,
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
      fontWeight: 600,
    },
    h4: {
      fontSize: "14px",
      marginTop: 10,
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    h5: {
      fontSize: "13px",
      fontWeight: 600,
    },
  },
  overrides: {
    MuiButton: {
      outlined: {
        backgroundColor: secondaryColor,
      },
    },
  },
});

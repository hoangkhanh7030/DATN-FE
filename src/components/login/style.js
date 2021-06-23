import { makeStyles } from "@material-ui/core/styles";

const loginStyle = makeStyles((theme) => ({
  login: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  text: {
    textAlign: "center",

  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#3870f5",
  },
  google: {
    margin: theme.spacing(2, 0, 2),
    backgroundColor: "#D63B30",
  },
  link: {
    color: "#3870f5",
  },
}));

export default loginStyle;

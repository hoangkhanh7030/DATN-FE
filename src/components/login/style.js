import { makeStyles } from "@material-ui/core/styles";
import * as colors from "assets/css/Common";

const loginStyle = makeStyles((theme) => ({
  main: {
    height: "100vh",
    width: "100vw",
    backgroundColor: colors.secondaryColor,
  },
  login: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
  },
  google: {
    margin: theme.spacing(2, 0, 2),
    color: colors.secondaryColor,
    backgroundColor: colors.ggColor,
  },
}));

export default loginStyle;

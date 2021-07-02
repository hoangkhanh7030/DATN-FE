import React from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { ThemeProvider } from "@material-ui/styles";

import logo from "../../assets/icons/app-logo.svg";
import loginStyle from "./style";
import { commonStyle, theme } from "../../assets/css/Common";

const LoginForm = (props) => {
  const classes = loginStyle();
  const commonClasses = commonStyle();

  const { handleInputChange, handleFormSubmit, errors } = { ...props };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" className={classes.name}>
        <div className={classes.login}>
          <img className={classes.image} src={logo} alt="Logo" width={30} />
          <Typography variant="h1">Sign In</Typography>
          <form className={classes.form} onSubmit={handleFormSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              autoComplete="off"
              onChange={handleInputChange}
              {...(errors.email && { error: true, helperText: errors.email })}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="off"
              onChange={handleInputChange}
              {...(errors.password && {
                error: true,
                helperText: errors.password,
              })}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Typography className={classes.text}>OR</Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.google}
            >
              <i className={commonClasses.ggicon + " fab fa-google"}></i>Login
              with Google
            </Button>

            <Grid container>
              <Grid item xs>
                <Typography variant="body2">Don't have an account?</Typography>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" color="primary">
                  {"Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </ThemeProvider>
  );
};
export default LoginForm;

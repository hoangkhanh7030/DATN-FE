import React from "react";

import {
  Button,
  TextField,
  Box,
  Typography,
  Container,
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { GoogleLogin } from "react-google-login";
import { GoogleButton } from "./GoogleButton";
import { CircularProgress } from "@material-ui/core";
import logo from "assets/icons/app-logo.svg";
import loginStyle from "./style";
import { theme } from "assets/css/Common";

const LoginForm = (props) => {
  const classes = loginStyle();

  const {
    handleInputChange,
    handleFormSubmit,
    handleLoginWithGG,
    errors,
    setInvalidInputs,
    isLoading = false,
    setLoginGG,
    isLoginGG = false,
  } = props;

  const handleClick = (renderProps) => {
    setInvalidInputs({});
    setLoginGG(true);
    renderProps.onClick();
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" className={classes.main}>
        <div className={classes.login}>
          <img className={classes.image} src={logo} alt="Logo" width={30} />
          <Typography variant="h1">Log In</Typography>
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

            <Box style={{ position: "relative" }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disableElevation
                className={classes.submit}
              >
                {isLoading && !isLoginGG ? "" : "Log In"}
              </Button>
              {isLoading && !isLoginGG ? (
                <CircularProgress
                  isOpen={isLoading}
                  style={{
                    position: "absolute",
                    width: 20,
                    height: 20,
                    color: "white",
                    top: "56%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px",
                  }}
                />
              ) : null}
            </Box>

            <Typography className={classes.text}>OR</Typography>
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              render={(renderProps) => (
                <Box style={{ position: "relative" }}>
                  <GoogleButton
                    isLoading={isLoading}
                    isLoginGG={isLoginGG}
                    onClick={() => handleClick(renderProps)}
                  />
                  {isLoading && isLoginGG ? (
                    <CircularProgress
                      isOpen={isLoading}
                      style={{
                        position: "absolute",
                        width: 20,
                        height: 20,
                        color: "white",
                        top: "56%",
                        left: "50%",
                        marginTop: "-12px",
                        marginLeft: "-12px",
                      }}
                    />
                  ) : null}
                </Box>
              )}
              onSuccess={handleLoginWithGG}
              onFailure={handleLoginWithGG}
              cookiePolicy={"single_host_origin"}
            />
          </form>
        </div>
      </Container>
    </ThemeProvider>
  );
};
export default LoginForm;

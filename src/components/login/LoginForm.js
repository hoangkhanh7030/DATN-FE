import React from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import loginStyle from "./style";
import commonStyle from "../../assets/css/commonStyle";

const LoginForm = (props) => {
  const classes = loginStyle();
  const commonClasses = commonStyle();
  
  const {handleInputChange,handleFormSubmit,errors} = {...props}
  
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.login}>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
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
            {...(errors.email && { error: true, helperText: errors.email})}
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
            
           {...(errors.password && { error: true, helperText: errors.password })}
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
            color="secondary"
            className={classes.google}
          >
            <i className={commonClasses.icon + " fab fa-google"}></i>Login with
            Google
          </Button>

          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" className={classes.link}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2" className={classes.link}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};
export default LoginForm;

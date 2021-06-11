import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  TextField,
  CssBaseline,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles";
import Input from "./Input";
import { GoogleLogin } from "react-google-login";
import Icon from "./Icon";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { signup } from "../../actions/auth";
import { signin } from "../../actions/auth";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSingup] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if (isSignup) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };

  const handleChange = (e) => {
    return setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => setShowPassword((previous) => !previous);

  const switchMode = () => {
    setShowPassword(false);
    return setIsSingup((previous) => !previous);
  };

  const googleSuccess = async (response) => {
    const result = response?.profileObj;
    const token = response?.tokenId;
    try {
      dispatch({ type: "AUTH", data: { result, token } });
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  const googleError = (e) => {
    console.log(e);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignup ? "Sign up" : "Sign in"}
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit}
          noValidate
          style={{ width: "70%" }}
        >
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <TextField
                  name="firstName"
                  label="First Name"
                  onChange={handleChange}
                  autoFocus
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  name="lastName"
                  label="Last Name"
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
              </>
            )}
            <TextField
              name="email"
              label="Email Address"
              onChange={handleChange}
              type="email"
              variant="outlined"
              margin="normal"
              required
              fullWidth
            />
            <TextField
              name="password"
              label="Password"
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              variant="outlined"
              margin="normal"
              fullWidth
            />
            {isSignup && (
              <TextField
                name="confirmPassword"
                label="Repeat Password"
                onChange={handleChange}
                type="password"
                fullWidth
                variant="outlined"
                margin="normal"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId={process.env.REACT_APP_CLIENT_ID}
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="secondary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;

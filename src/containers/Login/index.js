import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as constants from "constants/index";
import { login, loginWithGG } from "redux/actions/authAction";
import LoginForm from "components/login/LoginForm";
import { Message } from "components/common/Message";
import { Progress } from "components/common/Progress";

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [loginData, setLogin] = useState({ email: "", password: "" });
  const [invalidInputs, setInvalidInputs] = useState({});

  const { isLoggedIn, isLoading } = useSelector((state) => state.auth);
  const [isLoginGG, setLoginGG] = useState(false);
  const { message } = useSelector((state) => state.message);
  const [hasError, setOpenError] = useState(false);

  const handleCloseError = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
  };

  const isValid = (inputNameOnChange = loginData) => {
    const invalidCheck = { ...invalidInputs };

    if (constants.EMAIL in inputNameOnChange) {
      invalidCheck.email = inputNameOnChange.email
        ? constants.EMAIL_REGEX.test(inputNameOnChange.email)
          ? ""
          : constants.EMAIL_ERROR
        : "email is required";
    }

    if (constants.PASSWORD in inputNameOnChange) {
      invalidCheck.password = inputNameOnChange.password
        ? ""
        : constants.PASSWORD_ERROR;
    }

    setInvalidInputs({ ...invalidCheck });

    if (inputNameOnChange === loginData)
      return Object.values(invalidCheck).every((el) => el === "");
  };

  const handleInputChange = (e) => {
    if (hasError) setOpenError(false);
    const { name, value } = e.target;

    setLogin({ ...loginData, [name]: value });
    isValid({ [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!isValid()) return;

    const path = localStorage.getItem("path");
    dispatch(login(loginData))
      .then(() => {
        path ? history.push(path) : history.push(constants.WORKSPACES_URL);
      })
      .catch(() => {
        setOpenError(true);
      });
  };

  const handleLoginWithGG = (googleData) => {
    const path = localStorage.getItem("path");

    dispatch(loginWithGG(googleData.profileObj))
      .then(() => {
        path ? history.push(path) : history.push(constants.WORKSPACES_URL);
      })
      .catch(() => {
        setOpenError(true);
      })
      .finally(() => {
        setLoginGG(false);
      });
  };

  if (isLoggedIn) history.push(constants.WORKSPACES_URL);

  return (
    <Fragment>
      <LoginForm
        handleInputChange={handleInputChange}
        handleFormSubmit={handleFormSubmit}
        errors={invalidInputs}
        setInvalidInputs={setInvalidInputs}
        handleLoginWithGG={handleLoginWithGG}
        isLoading={isLoading}
        isLoginGG={isLoginGG}
        setLoginGG={setLoginGG}
      />
      {message && (
        <Message
          message={message}
          isOpen={hasError}
          handleCloseMessage={handleCloseError}
          type="error"
          errorLogin={true}
        />
      )}
    </Fragment>
  );
}

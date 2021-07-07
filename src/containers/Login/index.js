import React, { Fragment, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as constants from "constants/index";
import { login } from "redux/actions/authAction";
import LoginForm from "components/login/LoginForm";
import { Message } from "components/common/Message";
import { Progress } from "components/common/Progress";

export default function Login(props) {
  const [loginData, setLogin] = useState({ email: "", password: "" });
  const [invalidInputs, setInvalidInputs] = useState({});

  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const { message } = useSelector((state) => state.message);
  const [hasError, setOpenError] = useState(false);

  const handleCloseError = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
  };
  const dispatch = useDispatch();
  const history = useHistory();

  const isValid = (inputNameOnChange = loginData) => {
    const invalidCheck = { ...invalidInputs };

    if ("email" in inputNameOnChange) {
      invalidCheck.email =
        constants.EMAIL_REGEX.test(inputNameOnChange.email) &&
        inputNameOnChange.email
          ? ""
          : constants.EMAIL_ERROR;
    }

    if ("password" in inputNameOnChange) {
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
    setLoading(true);

    if (!isValid()) {
      setLoading(false);
      return;
    }
    dispatch(login(loginData))
      .then(() => {
        history.push("/workspaces");
      })
      .catch(() => {
        setLoading(false);
        setOpenError(true);
      });
  };

  if (isLoggedIn) return <Redirect to={constants.WORKSPACES_URL} />;

  return (
    <Fragment>
      <LoginForm
        handleInputChange={handleInputChange}
        handleFormSubmit={handleFormSubmit}
        errors={invalidInputs}
      />
      {message && (
        <Message
          message={message}
          isOpen={hasError}
          handleCloseMessage={handleCloseError}
          type="error"
        />
      )}
      <Progress isOpen={loading} />
    </Fragment>
  );
}

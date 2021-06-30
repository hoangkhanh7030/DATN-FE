import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import * as constants from "../../constants";
import LoginForm from "../../components/login/LoginForm";
import {Progress} from '../../components/common/Progress';
import { login } from "../../redux/actions/authAction";

export default function Login(props) {
  const [loginData, setLogin] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  const isValid = (inputNameOnChange = loginData) => {
    let errorsCheck = { ...errors };

    if ("email" in inputNameOnChange)
      errorsCheck.email =
        constants.EMAIL_REGEX.test(inputNameOnChange.email) &&
        inputNameOnChange.email
          ? ""
          : constants.EMAIL_ERROR;

    if ("password" in inputNameOnChange)
      errorsCheck.password = inputNameOnChange.password
        ? ""
        : constants.PASSWORD_ERROR;

    setErrors({ ...errorsCheck });

    if (inputNameOnChange === loginData)
      return Object.values(errorsCheck).every((el) => el === "");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setLogin({ ...loginData, [name]: value });
    isValid({ [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (isValid()) {
      dispatch(login(loginData))
        .then(() => {
          props.history.push("/workspaces");
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  if(isLoggedIn) return <Redirect to="/workspaces"/>

  return (
    <div>
      <LoginForm
      handleInputChange={handleInputChange}
      handleFormSubmit={handleFormSubmit}
      errors={errors}
      message = {message}
    />
    <Progress isOpen={loading}/>
    </div>
  );
}

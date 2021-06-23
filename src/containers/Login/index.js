import React, { useState } from "react";
import * as contants from "../../constants";
import LoginForm from "../../components/login/LoginForm";

export default function Login() {
  const [loginData, setLogin] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const isValid = (inputNameOnChange = loginData) => {
    let errorsCheck = { ...errors };

    if ("email" in inputNameOnChange)
      errorsCheck.email =
        contants.EMAIL_REGREX.test(inputNameOnChange.email) &&
        inputNameOnChange.email
          ? ""
          : contants.EMAIL_ERROR;

    if ("password" in inputNameOnChange)
      errorsCheck.password = inputNameOnChange.password
        ? ""
        : contants.PASSWORD_ERROR;

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
    if (isValid()) {
      console.log(loginData);
    }
  };

  return (
    <LoginForm
      handleInputChange={handleInputChange}
      handleFormSubmit={handleFormSubmit}
      errors={errors}
    />
  );
}

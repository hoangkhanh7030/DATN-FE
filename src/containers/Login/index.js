import React, { useState } from "react";

import LoginForm from "../../components/login/LoginForm";

export default function Login() {
  const [loginData, setLogin] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const isValidate = (inputNameOnChange = loginData) => {
    let errorsCheck = { ...errors };
    if ("email" in inputNameOnChange)
    errorsCheck.email =
        /$^|.+@.+..+/.test(inputNameOnChange.email) && inputNameOnChange.email
          ? ""
          : "email is not valid";
    if ("password" in inputNameOnChange)
    errorsCheck.password = inputNameOnChange.password ? "" : "password is required";
    setErrors({ ...errorsCheck });
    if (inputNameOnChange === loginData)
      return Object.values(errorsCheck).every((el) => el === "");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...loginData, [name]: value });
    isValidate({ [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isValidate()) {
      window.alert();
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

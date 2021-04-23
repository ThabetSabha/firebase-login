import React, { useState } from "react";
import "./create-user-form.styles.scss";

//Components
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

const CreateUserForm = () => {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
    username: "",
    mobileNumber: "",
    companyName: "",
    companyType: "",
  });

  const [isError, setIsError] = useState(null);

  const {
    email,
    password,
    mobileNumber,
    companyName,
    companyType,
    username,
  } = userCredentials;

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="create-user-container">
      <div className="create-user">
        <h2>Create a new user here</h2>

        <form onSubmit={handleSubmit}>
          <FormInput
            name="username"
            type="username"
            value={username}
            handleChange={handleChange}
            label="Username"
            required
          />
          <FormInput
            name="email"
            type="email"
            handleChange={handleChange}
            value={email}
            label="Email"
            required
          />
          <FormInput
            name="password"
            type="password"
            value={password}
            handleChange={handleChange}
            label="Password"
            required
          />

          <FormInput
            name="mobileNumber"
            type="mobileNumber"
            value={mobileNumber}
            handleChange={handleChange}
            label="Mobile Number"
            required
          />

          <FormInput
            name="companyName"
            type="companyName"
            value={companyName}
            handleChange={handleChange}
            label="Company Name"
            required
          />

          <FormInput
            name="companyType"
            type="companyType"
            value={companyType}
            handleChange={handleChange}
            label="Company Type"
            required
          />

          {isError !== null ? (
            <span className="error-span">{isError.message}</span>
          ) : (
            <span className="error-span" />
          )}
          <div className="buttons">
            <CustomButton type="submit"> Create User </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserForm;

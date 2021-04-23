import React, { useState } from "react";
import "./sign-in.styles.scss";

//Components
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

const SignIn = ({ signInWithEmail, isError }) => {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userCredentials;

  const handleSubmit = (event) => {
    event.preventDefault();
    signInWithEmail(email, password);
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="sign-in-container">
      <div className="sign-in">
        <h2>Sign in with your email and password</h2>

        <form onSubmit={handleSubmit}>
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
          {isError !== null ? (
            <div className="error-div">
              <span className="error-span">Check your Email and Password</span>
            </div>
          ) : null}
          <div className="buttons">
            <CustomButton type="submit"> Sign in </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;

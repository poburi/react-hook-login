import React, { useState } from "react";
import styled from "styled-components";
import { TextField, Paper, StylesProvider, Button } from "@material-ui/core";

import { AuthContext } from "../App";

interface ILogin {
  email: string | null;
  password: string | null;
  isSubmitting: boolean | null;
  errorMessage: string | null;
}
export const Login: React.FC = () => {
  const initialState = {
    email: "",
    password: "",
    isSubmitting: false,
    errorMessage: null,
  };
  const [data, setData] = useState(initialState);

  const handleInputChange = (event: any) => {
    event.preventDefault();
    setData({ ...data, [event.target.name]: event.target.value }); // email이면 email, password면 password
    // console.log(data);
  };

  const handleFormSubmit = (event: React.FocusEvent<HTMLFormElement>) => {
    event.preventDefault();
    setData({ ...data, isSubmitting: true, errorMessage: null });
  };

  return (
    <StylesProvider injectFirst>
      <Wrap elevation={3}>
        <form onSubmit={handleFormSubmit}>
          <Input
            type="text"
            name="email"
            label="email"
            variant="outlined"
            onChange={handleInputChange}
            fullWidth
          />
          <Input
            type="password"
            name="password"
            label="password"
            variant="outlined"
            onChange={handleInputChange}
            fullWidth
          />
          <Button
            type="submit"
            size="large"
            variant="contained"
            color="primary"
            disabled={data.isSubmitting}
            fullWidth
          >
            {data.isSubmitting ? "로딩" : "로그인"}
          </Button>
        </form>
      </Wrap>
    </StylesProvider>
  );
};

export default Login;

const Input = styled(TextField)`
  display: block;
  margin-bottom: 20px;
`;

const Wrap = styled(Paper)`
  width: 460px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 50px 0;

  form {
    width: 100%;
    padding: 0 20px;
  }
`;

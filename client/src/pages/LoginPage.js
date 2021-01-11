import React, { useState } from "react";
import { LogPage } from "./LogPage";
import { useDispatch } from "react-redux";
import { signIn } from "../redux/actions/authAction";
export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const loginResource = {
    username,
    setUsername,
    password,
    setPassword
  };

  const onLogin = e => {
    e.preventDefault();
    dispatch(signIn({ username, password }));
  };

  return <LogPage login loginResource={loginResource} onLogin={onLogin} />;
};

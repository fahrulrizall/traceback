import { _Post, _Get, _Delete } from "./base";

const endpoint = "auth";

const handleLogin = (model) => {
  const options = { headers: { contentType: "application/json" } };
  return _Post(
    `${process.env.REACT_APP_API_URL}/${endpoint}/login`,
    model,
    options
  );
};

const handleLogout = () => {
  let _options = {
    headers: { contentType: "application/json" },
    withCredentials: true,
  };
  return _Delete(`${process.env.REACT_APP_API_URL}/${endpoint}/logout`, {
    ..._options,
  });
};

const getRefreshToken = () => {
  let _options = {
    headers: { contentType: "application/json" },
    withCredentials: true,
  };
  return _Get(`${process.env.REACT_APP_API_URL}/${endpoint}/token`, {
    ..._options,
  });
};

export { handleLogin, getRefreshToken, handleLogout };

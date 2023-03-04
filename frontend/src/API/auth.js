import { _Post } from "./base";

const handleLogin = (model) => {
  const options = { headers: { contentType: "application/json" } };
  return _Post(`${process.env.REACT_APP_API_URL}/auth/login`, model, options);
};

export { handleLogin };

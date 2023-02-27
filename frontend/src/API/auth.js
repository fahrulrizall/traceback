import { _Post } from "./base";

const handleLogin = (model) => {
  const options = { headers: { contentType: "application/json" } };
  return _Post("http://localhost:4000/auth/login", model, options);
};

export { handleLogin };

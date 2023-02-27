const logRequest = (req, res, next) => {
  console.log("log request", req.path);
  console.log("body", req.body);
  next();
};

export default logRequest;

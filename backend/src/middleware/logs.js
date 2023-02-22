const logRequest = (req, res, next) => {
  console.log("log request ket", req.path);
  next();
};

module.exports = logRequest;

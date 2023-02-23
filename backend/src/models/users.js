const DBpool = require("../config/database");
const uuid = require("uuid");

const pagedSearchUsers = (pageIndex, pageSize) => {
  const SQLQuery = `SELECT uuid, name, username, email FROM users ORDER BY createdDateTime DESC LIMIT ${pageSize} OFFSET ${
    pageIndex * pageSize
  }`;

  return DBpool.execute(SQLQuery);
};

const totalCountUsers = () => {
  const SQLQuery = `SELECT COUNT(*) as totalCount FROM users`;

  return DBpool.execute(SQLQuery);
};

const createNewUser = (body) => {
  const SQLQuery = `INSERT INTO users (uuid, name, username, email, password, createdDateTime) VALUES ('${uuid.v4()}','${
    body.name
  }','${body.username}','${body.email}','${body.password}', UTC_TIMESTAMP())`;

  return DBpool.execute(SQLQuery);
};

const updateUser = (body, uuid) => {
  const SQLQuery = `UPDATE users SET name='${body.name}', email='${body.email}' WHERE uuid='${uuid}'`;

  return DBpool.execute(SQLQuery);
};

const deleteUser = (uuid) => {
  const SQLQuery = `DELETE FROM users WHERE uuid='${uuid}'`;

  return DBpool.execute(SQLQuery);
};

const readUser = (uuid) => {
  const SQLQuery = `SELECT * FROM users WHERE uuid='${uuid}'`;

  return DBpool.execute(SQLQuery);
};

const emailUserExist = (email) => {
  const SQLQuery = `SELECT * FROM users WHERE email='${email}'`;

  return DBpool.execute(SQLQuery);
};

const userNameExist = (username) => {
  const SQLQuery = `SELECT * FROM users WHERE username='${username}'`;

  return DBpool.execute(SQLQuery);
};

module.exports = {
  pagedSearchUsers,
  createNewUser,
  totalCountUsers,
  updateUser,
  deleteUser,
  readUser,
  emailUserExist,
  userNameExist,
};

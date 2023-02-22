const DBpool = require("../config/database");
const uuid = require("uuid");

const pagedSearchUsers = (pageIndex, pageSize) => {
  const SQLQuery = "SELECT * FROM users";

  return DBpool.execute(SQLQuery);
};

const createNewUser = (body) => {
  const SQLQuery = `INSERT INTO users (uuid, name, email, password, createdDate) VALUES ('${uuid.v4()}','${
    body.name
  }','${body.email}','${body.password}','CURRENT_TIMESTAMP')`;

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

module.exports = {
  pagedSearchUsers,
  createNewUser,
  updateUser,
  deleteUser,
  readUser,
};

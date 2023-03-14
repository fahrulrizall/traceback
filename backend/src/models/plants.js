const { v4: uuidv4 } = require("uuid");
const DBpool = require("../config/database.js");

const pagedSearchPlants = (pageIndex, pageSize) => {
  const SQLQuery = `SELECT uuid, name, location, batchCode, plantCode FROM plants ORDER BY createdDateTime DESC LIMIT ${pageSize} OFFSET ${
    pageIndex * pageSize
  }`;

  return DBpool.execute(SQLQuery);
};

const getAllPlants = () => {
  const SQLQuery = `SELECT uuid, name, location, batchCode, plantCode FROM plants ORDER BY createdDateTime DESC`;

  return DBpool.execute(SQLQuery);
};

const totalCountPlants = () => {
  const SQLQuery = `SELECT COUNT(*) as totalCount FROM plants`;

  return DBpool.execute(SQLQuery);
};

const createNewPlant = (body) => {
  const SQLQuery = `INSERT INTO plants (uuid, name, location, batchCode, plantCode, createdDateTime) VALUES ('${uuidv4()}','${
    body.name
  }','${body.location}','${body.batchCode}', '${
    body.plantCode
  }', UTC_TIMESTAMP())`;

  return DBpool.execute(SQLQuery);
};

const updatePlant = (body, uuid) => {
  const SQLQuery = `UPDATE plants SET name='${body.name}', location='${body.location}', batchCode='${body.batchCode}', plantCode='${body.plantCode}'  WHERE uuid='${uuid}'`;

  return DBpool.execute(SQLQuery);
};

const deletePlant = (uuid) => {
  const SQLQuery = `DELETE FROM plants WHERE uuid='${uuid}'`;

  return DBpool.execute(SQLQuery);
};

const readPlant = (uuid) => {
  const SQLQuery = `SELECT uuid, name, location, batchCode, plantCode FROM plants WHERE uuid='${uuid}'`;

  return DBpool.execute(SQLQuery);
};

const readUuid = (uuid) => {
  const SQLQuery = `SELECT idPlant FROM plants WHERE uuid='${uuid}'`;

  return DBpool.execute(SQLQuery);
};

module.exports = {
  pagedSearchPlants,
  getAllPlants,
  createNewPlant,
  totalCountPlants,
  updatePlant,
  deletePlant,
  readPlant,
  readUuid,
};

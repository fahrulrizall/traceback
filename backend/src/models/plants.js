import { v4 as uuidv4 } from "uuid";
import DBpool from "../config/database.js";

const pagedSearchPlants = (pageIndex, pageSize) => {
  const SQLQuery = `SELECT uuid, name, location, batchCode FROM plants ORDER BY createdDateTime DESC LIMIT ${pageSize} OFFSET ${
    pageIndex * pageSize
  }`;

  return DBpool.execute(SQLQuery);
};

const totalCountPlants = () => {
  const SQLQuery = `SELECT COUNT(*) as totalCount FROM plants`;

  return DBpool.execute(SQLQuery);
};

const createNewPlant = (body) => {
  const SQLQuery = `INSERT INTO plants (uuid, name, location, batchCode, createdDateTime) VALUES ('${uuidv4()}','${
    body.name
  }','${body.location}','${body.batchCode}', UTC_TIMESTAMP())`;

  return DBpool.execute(SQLQuery);
};

const updatePlant = (body, uuid) => {
  const SQLQuery = `UPDATE plants SET name='${body.name}', location='${body.location}', batchCode='${body.batchCode}'  WHERE uuid='${uuid}'`;

  return DBpool.execute(SQLQuery);
};

const deletePlant = (uuid) => {
  const SQLQuery = `DELETE FROM plants WHERE uuid='${uuid}'`;

  return DBpool.execute(SQLQuery);
};

const readPlant = (uuid) => {
  const SQLQuery = `SELECT uuid, name, location, batchCode FROM plants WHERE uuid='${uuid}'`;

  return DBpool.execute(SQLQuery);
};

export default {
  pagedSearchPlants,
  createNewPlant,
  totalCountPlants,
  updatePlant,
  deletePlant,
  readPlant,
};

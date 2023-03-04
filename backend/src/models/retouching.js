import { v4 as uuidv4 } from "uuid";
import DBpool from "../config/database.js";

const pagedSearchTrimming = (pageIndex, pageSize) => {
  const SQLQuery = `SELECT uuid, trimmingDate, weight, size, remarks FROM trimming ORDER BY createdDateTime DESC LIMIT ${pageSize} OFFSET ${
    pageIndex * pageSize
  }`;

  return DBpool.execute(SQLQuery);
};

const totalCountTrimming = () => {
  const SQLQuery = `SELECT COUNT(*) as totalCount FROM trimming`;

  return DBpool.execute(SQLQuery);
};

const createNewTrimming = (body) => {
  const SQLQuery = `INSERT INTO trimming (uuid, trimmingDate, weight, size, remarks, idReceiving, idVendor, createdDateTime) VALUES ('${uuidv4()}','${
    body.trimmingDate
  }','${body.weight}','${body.size}','${body.remarks}','${body.idReceiving}','${
    body.idVendor
  }', UTC_TIMESTAMP())`;

  return DBpool.execute(SQLQuery);
};

const updateTrimming = (body, uuid) => {
  const SQLQuery = `UPDATE trimming SET trimmingDate='${body.trimmingDate}' , weight='${body.weight}', size='${body.size}', remarks='${body.remarks}',  idReceiving='${body.idReceiving}', idVendor='${body.idVendor}'  WHERE uuid='${uuid}'`;

  return DBpool.execute(SQLQuery);
};

const deleteTrimming = (uuid) => {
  const SQLQuery = `DELETE FROM trimming WHERE uuid='${uuid}'`;

  return DBpool.execute(SQLQuery);
};

const readTrimming = (uuid) => {
  const SQLQuery = `SELECT uuid, trimmingDate, weight, size, idReceiving,  idVendor FROM trimming WHERE uuid='${uuid}'`;

  return DBpool.execute(SQLQuery);
};

export default {
  pagedSearchTrimming,
  createNewTrimming,
  totalCountTrimming,
  updateTrimming,
  deleteTrimming,
  readTrimming,
};

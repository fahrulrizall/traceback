import { v4 as uuidv4 } from "uuid";
import DBpool from "../config/database.js";

const pagedSearchReceiving = (pageIndex, pageSize) => {
  const SQLQuery = `SELECT uuid, receivingDate, pcs, grade, size, weight, idVendor FROM receiving ORDER BY createdDateTime DESC LIMIT ${pageSize} OFFSET ${
    pageIndex * pageSize
  }`;

  return DBpool.execute(SQLQuery);
};

const totalCountReceiving = () => {
  const SQLQuery = `SELECT COUNT(*) as totalCount FROM receiving`;

  return DBpool.execute(SQLQuery);
};

const createNewReceiving = (body) => {
  const SQLQuery = `INSERT INTO receiving (uuid, receivingDate, pcs, grade, size, weight, idVendor, createdDateTime) VALUES ('${uuidv4()}','${
    body.receivingDate
  }','${body.pcs}','${body.grade}','${body.size}','${body.weight}','${
    body.idVendor
  }', UTC_TIMESTAMP())`;

  return DBpool.execute(SQLQuery);
};

const updateReceiving = (body, uuid) => {
  const SQLQuery = `UPDATE receiving SET receivingDate='${body.receivingDate}', pcs='${body.pcs}', grade='${body.grade}' , size='${body.size}', weight='${body.weight}', idVendor='${body.idVendor}'  WHERE uuid='${uuid}'`;

  return DBpool.execute(SQLQuery);
};

const deleteReceiving = (uuid) => {
  const SQLQuery = `DELETE FROM receiving WHERE uuid='${uuid}'`;

  return DBpool.execute(SQLQuery);
};

const readReceiving = (uuid) => {
  const SQLQuery = `SELECT uuid, receivingDate, pcs, grade, size, weight, idVendor FROM receiving WHERE uuid='${uuid}'`;

  return DBpool.execute(SQLQuery);
};

export default {
  pagedSearchReceiving,
  createNewReceiving,
  totalCountReceiving,
  updateReceiving,
  deleteReceiving,
  readReceiving,
};

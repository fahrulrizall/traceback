const { v4: uuidv4 } = require("uuid");
const DBpool = require("../config/database.js");

const pagedSearchReceiving = (pageIndex, pageSize) => {
  const SQLQuery = `SELECT receiving.uuid, receiving.receivingDate, receiving.pcs, receiving.grade, receiving.size, receiving.weight, receiving.sequence, vendors.vendorCode as vendorCode FROM receiving JOIN vendors ON receiving.idVendor = vendors.idVendor ORDER BY receiving.createdDateTime DESC LIMIT ${pageSize} OFFSET ${
    pageIndex * pageSize
  }`;

  return DBpool.execute(SQLQuery);
};

const totalCountReceiving = () => {
  const SQLQuery = `SELECT COUNT(*) as totalCount FROM receiving`;

  return DBpool.execute(SQLQuery);
};

const createNewReceiving = (body, sequence, idVendor) => {
  const SQLQuery = `INSERT INTO receiving (uuid, receivingDate, pcs, grade, size, weight, idVendor, sequence, createdDateTime) VALUES ('${uuidv4()}','${
    body.receivingDate
  }','${body.pcs}','${body.grade}','${body.size}','${
    body.weight
  }','${idVendor}','${sequence}', UTC_TIMESTAMP())`;

  return DBpool.execute(SQLQuery);
};

const updateReceiving = (body, idVendor, uuid) => {
  const SQLQuery = `UPDATE receiving SET receivingDate='${body.receivingDate}', pcs='${body.pcs}', grade='${body.grade}' , size='${body.size}', weight='${body.weight}', idVendor='${idVendor}'  WHERE uuid='${uuid}'`;

  return DBpool.execute(SQLQuery);
};

const deleteReceiving = (uuid) => {
  const SQLQuery = `DELETE FROM receiving WHERE uuid='${uuid}'`;

  return DBpool.execute(SQLQuery);
};

const readReceiving = (uuid) => {
  const SQLQuery = `SELECT receiving.uuid, receiving.receivingDate, receiving.pcs, receiving.grade, receiving.size, receiving.weight, 
  vendors.uuid as vendorUuid, vendors.vendorCode FROM receiving JOIN vendors ON receiving.idVendor = vendors.idVendor WHERE receiving.uuid='${uuid}'`;

  return DBpool.execute(SQLQuery);
};

const readSequence = (date, idVendor) => {
  const SQLQuery = `SELECT MAX(sequence) as max FROM receiving WHERE receivingDate='${date}' AND idVendor='${idVendor}' `;

  return DBpool.execute(SQLQuery);
};

module.exports = {
  pagedSearchReceiving,
  createNewReceiving,
  totalCountReceiving,
  updateReceiving,
  deleteReceiving,
  readReceiving,
  readSequence,
};

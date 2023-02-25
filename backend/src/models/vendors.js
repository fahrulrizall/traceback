import { v4 as uuidv4 } from "uuid";
import DBpool from "../config/database.js";

const pagedSearchVendors = (pageIndex, pageSize) => {
  const SQLQuery = `SELECT uuid, supplierName, certificateType, fleet, owner, materialType, fairtradeNo FROM vendors ORDER BY createdDateTime DESC LIMIT ${pageSize} OFFSET ${
    pageIndex * pageSize
  }`;

  return DBpool.execute(SQLQuery);
};

const totalCountVendors = () => {
  const SQLQuery = `SELECT COUNT(*) as totalCount FROM vendors`;

  return DBpool.execute(SQLQuery);
};

const createNewVendors = (body) => {
  const SQLQuery = `INSERT INTO vendors (uuid, supplierName, certificateType, fleet, owner, materialType, fairtradeNo, createdDateTime) VALUES ('${uuidv4()}','${
    body.supplierName
  }','${body.certificateType}','${body.fleet}','${body.owner}','${
    body.materialType
  }','${body.fairtradeNo}', UTC_TIMESTAMP())`;

  return DBpool.execute(SQLQuery);
};

const updateVendor = (body, uuid) => {
  const SQLQuery = `UPDATE vendors SET name='${body.name}', certificateType='${body.certificateType}', fleet='${body.fleet}', owner='${body.owner}', materialType='${body.materialType}',fairtradeNo='${body.fairtradeNo}',lastModifiedDateTime='UTC_TIMESTAMP()'  WHERE uuid='${uuid}'`;

  return DBpool.execute(SQLQuery);
};

const deleteVendor = (uuid) => {
  const SQLQuery = `DELETE FROM vendors WHERE uuid='${uuid}'`;

  return DBpool.execute(SQLQuery);
};

const readVendor = (uuid) => {
  const SQLQuery = `SELECT * FROM vendors WHERE uuid='${uuid}'`;

  return DBpool.execute(SQLQuery);
};

export default {
  pagedSearchVendors,
  createNewVendors,
  totalCountVendors,
  updateVendor,
  deleteVendor,
  readVendor,
};

const { v4: uuidv4 } = require("uuid");
const DBpool = require("../config/database.js");

const pagedSearchVendors = (pageIndex, pageSize) => {
  const SQLQuery = `SELECT vendors.uuid, vendors.vendorCode, vendors.supplierName, vendors.certificateType, vendors.fleet, vendors.owner, vendors.rawMaterialType, plants.plantCode 
  FROM vendors JOIN plants ON vendors.idPlant = plants.idPlant ORDER BY vendors.createdDateTime DESC LIMIT ${pageSize} OFFSET ${
    pageIndex * pageSize
  }`;

  return DBpool.execute(SQLQuery);
};

const totalCountVendors = () => {
  const SQLQuery = `SELECT COUNT(*) as totalCount FROM vendors`;

  return DBpool.execute(SQLQuery);
};

const createNewVendors = (body) => {
  console.log(body);
  const SQLQuery = `INSERT INTO vendors (uuid, supplierName, vendorCode, certificateType, fleet, owner, rawMaterialType, idPlant, createdDateTime) 
  VALUES ('${uuidv4()}','${body.supplierName}','${body.vendorCode}',
  '${body.certificateType}','${body.fleet}','${body.owner}','${
    body.rawMaterialType
  }','${body.idPlant}', UTC_TIMESTAMP())`;

  return DBpool.execute(SQLQuery);
};

const updateVendor = (body, idPlant, uuid) => {
  console.log(idPlant);
  const SQLQuery = `UPDATE vendors SET supplierName='${body.supplierName}', vendorCode='${body.vendorCode}', 
  certificateType='${body.certificateType}', fleet='${body.fleet}', owner='${body.owner}', 
  rawMaterialType='${body.rawMaterialType}', idPlant='${idPlant}', lastModifiedDateTime='UTC_TIMESTAMP()' WHERE uuid='${uuid}'`;

  return DBpool.execute(SQLQuery);
};

const deleteVendor = (uuid) => {
  const SQLQuery = `DELETE FROM vendors WHERE uuid='${uuid}'`;

  return DBpool.execute(SQLQuery);
};

const readVendor = (uuid) => {
  const SQLQuery = `SELECT vendors.uuid, vendors.supplierName, vendors.vendorCode, vendors.certificateType, vendors.fleet, vendors.owner, vendors.rawMaterialType, plants.uuid as idPlant
  FROM vendors JOIN plants ON vendors.idPlant = plants.idPlant WHERE vendors.uuid='${uuid}'`;

  return DBpool.execute(SQLQuery);
};

const readVendorCode = (code) => {
  const SQLQuery = `SELECT uuid, vendorCode, supplierName from vendors where vendorCode='${code}'`;

  return DBpool.execute(SQLQuery);
};

const readUuid = (uuid) => {
  const SQLQuery = `SELECT idVendor FROM vendors WHERE uuid='${uuid}'`;

  return DBpool.execute(SQLQuery);
};

module.exports = {
  pagedSearchVendors,
  createNewVendors,
  totalCountVendors,
  updateVendor,
  deleteVendor,
  readVendor,
  readVendorCode,
  readUuid,
};

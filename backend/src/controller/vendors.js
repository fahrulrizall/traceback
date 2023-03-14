const { validationResult } = require("express-validator");
const VendorsModel = require("../models/vendors.js");
const PlantsModel = require("../models/plants.js");

const pagedSearchVendors = async (req, res) => {
  const errros = validationResult(req);
  const { pageIndex, pageSize } = req.query;

  if (!errros.isEmpty()) {
    return res.status(400).json({
      messages: errros.array(),
    });
  }

  try {
    const [data] = await VendorsModel.pagedSearchVendors(pageIndex, pageSize);

    const [totalCountPlants] = await VendorsModel.totalCountVendors();

    res.json({
      totalCount: totalCountPlants[0].totalCount,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

const createNewVendor = async (req, res) => {
  const errros = validationResult(req);
  const request = req.body;

  if (!errros.isEmpty()) {
    return res.status(400).json({
      messages: errros.array(),
    });
  }

  const [uuid] = await PlantsModel.readUuid(request.idPlant);

  const data = {
    supplierName: request.supplierName,
    certificateType: request.certificateType,
    vendorCode: request.vendorCode,
    fleet: request.fleet,
    owner: request.owner,
    rawMaterialType: request.rawMaterialType,
    fairtradeNo: request.fairtradeNo,
    idPlant: uuid[0].idPlant,
  };

  try {
    await VendorsModel.createNewVendors(data);
    res.status(201).json({
      messages: request,
    });
  } catch (error) {
    res.status(500).json({
      messages: "Error",
    });
  }
};

const updateVendor = async (req, res) => {
  const { uuid } = req.params;
  const request = req.body;
  const errros = validationResult(req);

  if (!errros.isEmpty()) {
    return res.status(400).json({
      messages: errros.array(),
    });
  }

  const [vendor] = await VendorsModel.readVendor(uuid);
  const [plant] = await PlantsModel.readUuid(request.idPlant);

  if (vendor.length === 0) {
    return res.status(400).json({
      messages: "uuid not exist",
    });
  }

  try {
    await VendorsModel.updateVendor(request, plant[0].idPlant, uuid);
    res.json({
      data: {
        id: uuid,
        ...request,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

const deleteVendor = async (req, res) => {
  const { uuid } = req.params;

  const [data] = await VendorsModel.readVendor(uuid);

  if (data.length === 0) {
    return res.status(400).json({
      messages: "uuid not exist",
    });
  }

  try {
    await VendorsModel.deleteVendor(uuid);
    res.json({
      id: uuid,
    });
  } catch (error) {
    res.status(500).json({
      message: `delete user ${uuid}`,
    });
  }
};

const readVendor = async (req, res) => {
  const { uuid } = req.params;

  try {
    const [data] = await VendorsModel.readVendor(uuid);

    res.json({
      data: data[0],
    });
  } catch (error) {
    res.status(500).json({
      message: `uuid not exist`,
    });
  }
};

const getVendorCode = async (req, res) => {
  const { code } = req.params;

  try {
    const [data] = await VendorsModel.readVendorCode(code);

    res.json({
      data: data[0],
    });
  } catch (error) {
    res.status(500).json({
      message: `vendor code not exist`,
    });
  }
};

module.exports = {
  pagedSearchVendors,
  createNewVendor,
  updateVendor,
  deleteVendor,
  readVendor,
  getVendorCode,
};

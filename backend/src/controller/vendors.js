import { validationResult } from "express-validator";
import VendorsModel from "../models/vendors.js";

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

  const data = {
    name: request.name,
    certificateType: request.certificateType,
    fleet: request.fleet,
    owner: request.owner,
    materialType: request.materialType,
    fairtradeNo: request.fairtradeNo,
    idPlant: request.idPlant,
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

  const [data] = await VendorsModel.readVendor(uuid);

  if (data.length === 0) {
    return res.status(400).json({
      messages: "uuid not exist",
    });
  }

  try {
    await VendorsModel.updatePlant(request, uuid);
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

export default {
  pagedSearchVendors,
  createNewVendor,
  updateVendor,
  deleteVendor,
  readVendor,
};

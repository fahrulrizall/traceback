const { validationResult } = require("express-validator");
const PlantsModel = require("../models/plants.js");

const pagedSearchPlants = async (req, res) => {
  const errros = validationResult(req);
  const { pageIndex, pageSize } = req.query;

  if (!errros.isEmpty()) {
    return res.status(400).json({
      messages: errros.array(),
    });
  }

  try {
    const [data] = await PlantsModel.pagedSearchPlants(pageIndex, pageSize);

    const [totalCountPlants] = await PlantsModel.totalCountPlants();

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

const getAllPlants = async (req, res) => {
  try {
    const [data] = await PlantsModel.getAllPlants();

    res.json({
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

const createNewPlant = async (req, res) => {
  const errros = validationResult(req);
  const request = req.body;

  if (!errros.isEmpty()) {
    return res.status(400).json({
      messages: errros.array(),
    });
  }

  try {
    await PlantsModel.createNewPlant(request);
    res.status(201).json({
      messages: request,
    });
  } catch (error) {
    res.status(500).json({
      messages: "Error",
    });
  }
};

const updatePlant = async (req, res) => {
  const { uuid } = req.params;
  const request = req.body;
  const errros = validationResult(req);

  if (!errros.isEmpty()) {
    return res.status(400).json({
      messages: errros.array(),
    });
  }

  const [data] = await PlantsModel.readPlant(uuid);

  if (data.length === 0) {
    return res.status(400).json({
      messages: "uuid not exist",
    });
  }

  try {
    await PlantsModel.updatePlant(request, uuid);
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

const deletePlant = async (req, res) => {
  const { uuid } = req.params;

  const [data] = await PlantsModel.readPlant(uuid);

  if (data.length === 0) {
    return res.status(400).json({
      messages: "uuid not exist",
    });
  }

  try {
    await PlantsModel.deletePlant(uuid);

    res.json({
      id: uuid,
    });
  } catch (error) {
    res.status(500).json({
      message: `delete user ${uuid}`,
    });
  }
};

const readPlant = async (req, res) => {
  const { uuid } = req.params;

  try {
    const [data] = await PlantsModel.readPlant(uuid);

    res.json({
      data: data[0],
    });
  } catch (error) {
    res.status(500).json({
      message: `uuid not exist`,
    });
  }
};

module.exports = {
  pagedSearchPlants,
  getAllPlants,
  createNewPlant,
  updatePlant,
  deletePlant,
  readPlant,
};

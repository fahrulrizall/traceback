const { validationResult } = require("express-validator");
const TrimmingModel = require("../models/trimming.js");

const pagedSearchTrimming = async (req, res) => {
  const errros = validationResult(req);
  const { pageIndex, pageSize } = req.query;

  if (!errros.isEmpty()) {
    return res.status(400).json({
      messages: errros.array(),
    });
  }

  try {
    const [data] = await TrimmingModel.pagedSearchTrimming(pageIndex, pageSize);

    const [totalCount] = await TrimmingModel.totalCountTrimming();

    res.json({
      totalCount: totalCount[0].totalCount,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

const createNewTrimming = async (req, res) => {
  const errros = validationResult(req);
  const request = req.body;

  if (!errros.isEmpty()) {
    return res.status(400).json({
      messages: errros.array(),
    });
  }

  try {
    await TrimmingModel.createNewTrimming(request);
    res.status(201).json({
      messages: request,
    });
  } catch (error) {
    res.status(500).json({
      messages: "Error",
    });
  }
};

const updateTrimming = async (req, res) => {
  const { uuid } = req.params;
  const request = req.body;
  const errros = validationResult(req);

  if (!errros.isEmpty()) {
    return res.status(400).json({
      messages: errros.array(),
    });
  }

  const [data] = await TrimmingModel.readTrimming(uuid);

  if (data.length === 0) {
    return res.status(400).json({
      messages: "uuid not exist",
    });
  }

  try {
    await TrimmingModel.updateTrimming(request, uuid);
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

const deleteTrimming = async (req, res) => {
  const { uuid } = req.params;

  const [data] = await TrimmingModel.readTrimming(uuid);

  if (data.length === 0) {
    return res.status(400).json({
      messages: "uuid not exist",
    });
  }

  try {
    await TrimmingModel.deleteTrimming(uuid);
    res.json({
      id: uuid,
    });
  } catch (error) {
    res.status(500).json({
      message: `delete user ${uuid}`,
    });
  }
};

const readTrimming = async (req, res) => {
  const { uuid } = req.params;

  try {
    const [data] = await TrimmingModel.readTrimming(uuid);

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
  pagedSearchTrimming,
  createNewTrimming,
  updateTrimming,
  deleteTrimming,
  readTrimming,
};

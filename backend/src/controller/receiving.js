import { validationResult } from "express-validator";
import ReceivingModel from "../models/receiving.js";

const pagedSearchReceiving = async (req, res) => {
  const errros = validationResult(req);
  const { pageIndex, pageSize } = req.query;

  if (!errros.isEmpty()) {
    return res.status(400).json({
      messages: errros.array(),
    });
  }

  try {
    const [data] = await ReceivingModel.pagedSearchReceiving(
      pageIndex,
      pageSize
    );

    const [totalCountPlants] = await ReceivingModel.totalCountReceiving();

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

const createNewReceiving = async (req, res) => {
  const errros = validationResult(req);
  const request = req.body;

  if (!errros.isEmpty()) {
    return res.status(400).json({
      messages: errros.array(),
    });
  }

  try {
    await ReceivingModel.createNewReceiving(request);
    res.status(201).json({
      messages: request,
    });
  } catch (error) {
    res.status(500).json({
      messages: "Error",
    });
  }
};

const updateReceiving = async (req, res) => {
  const { uuid } = req.params;
  const request = req.body;
  const errros = validationResult(req);

  if (!errros.isEmpty()) {
    return res.status(400).json({
      messages: errros.array(),
    });
  }

  const [data] = await ReceivingModel.readReceiving(uuid);

  if (data.length === 0) {
    return res.status(400).json({
      messages: "uuid not exist",
    });
  }

  try {
    await ReceivingModel.updateReceiving(request, uuid);
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

const deleteReceiving = async (req, res) => {
  const { uuid } = req.params;

  const [data] = await ReceivingModel.readReceiving(uuid);

  if (data.length === 0) {
    return res.status(400).json({
      messages: "uuid not exist",
    });
  }

  try {
    await ReceivingModel.deleteReceiving(uuid);
    res.json({
      id: uuid,
    });
  } catch (error) {
    res.status(500).json({
      message: `delete user ${uuid}`,
    });
  }
};

const readReceiving = async (req, res) => {
  const { uuid } = req.params;

  try {
    const [data] = await ReceivingModel.readReceiving(uuid);

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
  pagedSearchReceiving,
  createNewReceiving,
  updateReceiving,
  deleteReceiving,
  readReceiving,
};

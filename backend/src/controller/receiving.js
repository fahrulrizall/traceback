const { validationResult } = require("express-validator");
const ReceivingModel = require("../models/receiving.js");
const VendorsModel = require("../models/vendors.js");
const moment = require("moment");

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

    const handleFishCode = (vendorCode, date, sequence) => {
      const month = new Date(date).getUTCMonth() + 1;
      const year = new Date(date).getFullYear().toString().substring(2);

      let newSequence;

      if (sequence < 10) {
        newSequence = `${"00" + sequence}`;
      } else if (sequence < 100) {
        newSequence = `${0 + sequence}`;
      } else {
        newSequence = `${sequence}`;
      }

      if (month < 10) {
        return `${vendorCode}.0${month + year}.${newSequence}`;
      } else {
        return `${vendorCode}.${month + year}.${newSequence}`;
      }
    };

    data.map((item) => {
      (item.fishCode = handleFishCode(
        item.vendorCode,
        item.receivingDate,
        item.sequence
      )),
        (item.receivingDate = new Date(item.receivingDate).toLocaleDateString(
          "id-ID",
          {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }
        ));
    });

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

  const [vendor] = await VendorsModel.readUuid(request.vendorUuid);
  const [sequence] = await ReceivingModel.readSequence(
    request.receivingDate,
    vendor[0].idVendor
  );

  const newSequence = sequence[0].max + 1;

  try {
    await ReceivingModel.createNewReceiving(
      request,
      newSequence,
      vendor[0].idVendor
    );
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
  const [vendor] = await VendorsModel.readUuid(request.vendorUuid);
  const [data] = await ReceivingModel.readReceiving(uuid);

  if (data.length === 0) {
    return res.status(400).json({
      messages: "uuid not exist",
    });
  }

  try {
    await ReceivingModel.updateReceiving(request, vendor[0].idVendor, uuid);
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

    data.map((item) => {
      item.receivingDate = moment(item.receivingDate).format("YYYY-MM-DD");
    });

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
  pagedSearchReceiving,
  createNewReceiving,
  updateReceiving,
  deleteReceiving,
  readReceiving,
};

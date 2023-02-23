const UsersModel = require("../models/users");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const pagedSearchUsers = async (req, res) => {
  const errros = validationResult(req);
  const { pageIndex, pageSize } = req.query;

  if (!errros.isEmpty()) {
    res.status(400).json({
      messages: errros.array(),
    });
    return;
  }

  try {
    const [data] = await UsersModel.pagedSearchUsers(pageIndex, pageSize);

    const [totalCountUsers] = await UsersModel.totalCountUsers();

    res.json({
      totalCount: totalCountUsers[0].totalCount,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

const createNewUser = async (req, res) => {
  const errros = validationResult(req);
  const request = req.body;

  if (!errros.isEmpty()) {
    res.status(400).json({
      messages: errros.array(),
    });
    return;
  }

  const [email] = await UsersModel.emailUserExist(request.email);

  if (email.length > 0) {
    res.status(400).json({
      messages: "Email already exist",
    });
    return;
  }

  const [username] = await UsersModel.userNameExist(request.username);

  if (username.length > 0) {
    res.status(400).json({
      messages: "Username already exist",
    });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(request.password, salt);

  const data = {
    name: request.name,
    email: request.email,
    password: hashPassword,
    username: request.username,
  };

  try {
    await UsersModel.createNewUser(data);
    res.status(201).json({
      messages: request,
    });
  } catch (error) {
    res.status(500).json({
      messages: request,
    });
  }
};

const updateUser = async (req, res) => {
  const { uuid } = req.params;
  const request = req.body;

  try {
    await UsersModel.updateUser(request, uuid);
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

const deleteUser = async (req, res) => {
  const { uuid } = req.params;

  try {
    await UsersModel.deleteUser(uuid);
    res.json({
      id: uuid,
    });
  } catch (error) {
    res.status(500).json({
      message: `delete user ${req.params.id}`,
    });
  }
};

const readUser = async (req, res) => {
  const { uuid } = req.params;

  try {
    const [data] = await UsersModel.readUser(uuid);

    res.json({
      data: data[0],
    });
  } catch (error) {
    res.status(500).json({
      message: `read user ${req.params.uuid}`,
    });
  }
};

module.exports = {
  pagedSearchUsers,
  createNewUser,
  updateUser,
  deleteUser,
  readUser,
};

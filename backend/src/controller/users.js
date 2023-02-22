const UsersModel = require("../models/users");
const encyrpt = require("../utility/encryptpassword");

const pagedSearchUsers = async (req, res) => {
  const { pageIndex, pageSize } = req.query;

  try {
    const [data] = await UsersModel.pagedSearchUsers(pageIndex, pageSize);

    res.json({
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

const createNewUser = async (req, res) => {
  const { body } = req;

  const hashPassword = encyrpt.cryptPassword(body.password, (err, hash) => {
    console.log(hash);
    return hash;
  });

  console.log(hashPassword);

  const data = {
    name: body.name,
    email: body.email,
    password: hashPassword,
  };

  try {
    await UsersModel.createNewUser(data);
    res.json({
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

const updateUser = async (req, res) => {
  const { uuid } = req.params;
  const { body } = req;

  try {
    await UsersModel.updateUser(body, uuid);
    res.json({
      data: {
        id: uuid,
        ...body,
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

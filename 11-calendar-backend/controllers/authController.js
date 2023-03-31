const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/UserModel');
const { generateJwt } = require('../helpers/jwt');

const getUsers = async (req = request, res = response) => {
  const users = await User.find();
  return res.status(200).json({ users });
};

const createUser = async (req = request, res = response) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: 'The email is already used',
      });
    }

    user = new User(req.body);

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    const token = await generateJwt(user.uid, user.name);

    return res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Unexpected error please ask the admin',
    });
  }
};

const loginUser = async (req = request, res = response) => {
  const { email, password } = req.body;
  const errorResponse = {
    ok: false,
    msg: 'Invalid email or password',
  };

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json(errorResponse);
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json(errorResponse);
    }

    const token = await generateJwt(user.id, user.name);

    return res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Unexpected error please ask the admin',
    });
  }
};

const renewToken = async (req = request, res = response) => {
  const uid = req.uid;
  const name = req.name;
  const token = await generateJwt(uid, name);
  return res.json({
    ok: true,
    msg: 'Renew token',
    token,
  });
};

module.exports = {
  getUsers,
  createUser,
  loginUser,
  renewToken,
};

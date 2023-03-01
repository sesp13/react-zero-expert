const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/UserModel');

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

    return res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Unexpected error please ask the admin',
    });
  }
};

const loginUser = (req = request, res = response) => {
  const { email, password } = req.body;
  return res.json({
    ok: true,
    msg: 'Login user',
    email,
    password,
  });
};

const renewToken = (req = request, res = response) => {
  return res.json({
    ok: true,
    msg: 'Renew token',
  });
};

module.exports = {
  createUser,
  loginUser,
  renewToken,
};

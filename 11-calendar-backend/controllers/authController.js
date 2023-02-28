const { request, response } = require('express');

const createUser = (req = request, res = response) => {
  const { email, password, name } = req.body;

  return res.json({
    ok: true,
    msg: 'Create user',
    email,
    password,
    name,
  });
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

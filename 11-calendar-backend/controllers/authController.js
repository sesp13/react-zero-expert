const { request, response } = require('express');

const createUser = (req = request, res = response) => {
  return res.json({
    ok: true,
    msg: 'Create user',
  });
};

const loginUser = (req = request, res = response) => {
  return res.json({
    ok: true,
    msg: 'Login user',
  });
}

const renewToken = (req = request, res = response) => {
  return res.json({
    ok: true,
    msg: 'Renew token',
  });
}


module.exports = {
  createUser,
  loginUser,
  renewToken
};

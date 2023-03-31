const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const key = process.env.SECRET_JWT_KEY;

const validateJWT = (req = request, res = response, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'There is not any token in the request',
    });
  }

  try {
    const { id, name } = jwt.verify(token, key);
    req.id = id;
    req.name = name;
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Invalid token',
    });
  }

  next();
};

module.exports = { validateJWT };

const jwt = require('jsonwebtoken');

const key = process.env.SECRET_JWT_KEY;

const generateJwt = (uid, name) =>
  new Promise((resolve, reject) => {
    const payload = { uid, name };
    jwt.sign(payload, key, { expiresIn: '4h' }, (error, token) => {
      if (error) {
        console.log(error);
        reject(`The token could't be generated`);
      }
      resolve(token);
    });
  });

module.exports = { generateJwt };

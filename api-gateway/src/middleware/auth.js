const httpStatus = require('http-status');

module.exports = (secretKey) => (req, res, next) => {
  const bearerHeader = req.headers.authorization;

  if (bearerHeader) {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    if (secretKey === bearerToken) {
      return next();
    }

    return res.status(httpStatus.UNAUTHORIZED).send({ message: 'Invalid auth token!' });
  }

  return res.status(httpStatus.UNAUTHORIZED).send({ message: 'Invalid auth token!' });
};

const express = require('express');
const validate = require('express-validation');

const router = express.Router();

const auth = require('../middleware/auth');
const validation = require('../validations');
const { publicSecret, internalSecret } = require('../config/vars');
const { addUser, getUserList, updateUser } = require('../controller/user');
const { addRoom, reserveARoom, getRoomList } = require('../controller/room');

router.get('/status', (req, res) => res.send('OK'));

router
  .route('/users')
  .get(auth(publicSecret), getUserList)
  .post(auth(publicSecret), validate(validation.addUser), addUser);

router.patch(
  '/users/:id/update-bonus-points',
  auth(internalSecret),
  validate(validation.updateUser),
  updateUser,
);

router
  .route('/rooms')
  .get(auth(publicSecret), getRoomList)
  .post(auth(publicSecret), validate(validation.addRoom), addRoom);

router
  .route('/rooms/:roomId/make-reservation')
  .post(auth(publicSecret), validate(validation.reserveRoom), reserveARoom);

module.exports = router;

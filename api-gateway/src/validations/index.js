const Joi = require('joi');

exports.addUser = {
  body: {
    name: Joi.string().max(100).required(),
    bonusPoints: Joi.number().min(0),
  },
};

exports.updateUser = {
  params: {
    id: Joi.string().max(24).required(),
  },
  body: {
    num: Joi.number().required(),
  },
};

exports.addRoom = {
  body: {
    name: Joi.string().max(100).required(),
    availableAmount: Joi.number().min(0),
    requiredPoints: Joi.number().min(0),
  },
};

exports.reserveRoom = {
  params: {
    roomId: Joi.string().max(24).required(),
  },
  body: {
    userId: Joi.string().max(24).required(),
  },
};

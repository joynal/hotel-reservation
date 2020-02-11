const httpStatus = require('http-status');

const { mq } = require('../config/vars');
const RoomModel = require('../models/room');
const UserModel = require('../models/user');
const sendToQueue = require('../utils/sendToQueue');

exports.getRoomList = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 20;
    const currentPage = parseInt(req.query.page, 10) || 1;
    const skip = (currentPage - 1) * limit;
    const query = {};
    const countQuery = {};
    const sort = {};
    let order = -1;
    const orderBy = req.query.orderBy ? req.query.orderBy : 'createdAt';

    if (req.query.order && req.query.order === 'asc') order = 1;

    sort[orderBy] = order;

    if (req.query.search) {
      query.name = { $regex: new RegExp(req.query.search, 'i') };
      countQuery.name = { $regex: new RegExp(req.query.search, 'i') };
    }

    const rooms = await RoomModel
      .find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .select('-__v')
      .lean();

    const total = await RoomModel.countDocuments(countQuery);

    return res.status(httpStatus.OK).send({ data: rooms, total });
  } catch (err) {
    console.error('room list err:', err.message);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
};

exports.addRoom = async (req, res) => {
  try {
    const room = await RoomModel.create(req.body);
    return res.status(httpStatus.OK).send(room);
  } catch (err) {
    console.error('add room err:', err.message);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
  }
};

exports.reserveARoom = async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userId);

    if (!user) {
      return res.status(httpStatus.NOT_FOUND).send({ message: 'User not found!' });
    }

    const room = await RoomModel.findById(req.params.roomId);

    if (!room) {
      return res.status(httpStatus.NOT_FOUND).send({ message: 'Room not found!' });
    }

    if (room.availableAmount < 1) {
      return res.status(httpStatus.NOT_FOUND).send({ message: 'Room not available!' });
    }

    // send payload to reservation service
    sendToQueue(mq.reservationTopic, JSON.stringify({ ...req.body, roomId: req.params.roomId }));

    return res.status(httpStatus.OK).send({ message: 'Reservation is being processing.' });
  } catch (err) {
    console.error('add room err:', err.message);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
  }
};

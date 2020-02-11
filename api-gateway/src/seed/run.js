const db = require('../config/database');
const { users, rooms } = require('./data');
const RoomModel = require('../models/room');
const UserModel = require('../models/user');

const run = async () => {
  try {
    db.connect();

    const res = await RoomModel.insertMany(rooms);
    console.log('room seeded =====>', res);

    const res2 = await UserModel.insertMany(users);
    console.log('user seeded =====>', res2);

    process.exit(0);
  } catch (err) {
    console.error(err);
  }
};

run();

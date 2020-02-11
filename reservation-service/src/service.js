const { mq } = require('./config/vars');
const database = require('./config/database');
const sendEmail = require('./utils/sendEmail');
const getConsumer = require('./utils/consumer');

const RoomModel = require('./models/room');
const UserModel = require('./models/user');
const ReserveHistoryModel = require('./models/reserveHistory');

const processReservation = async (record) => {
  try {
    const msg = JSON.parse(record.value.toString());

    const user = await UserModel.findById(msg.userId);
    const room = await RoomModel.findById(msg.roomId);

    if (user && room && room.availableAmount) {
      const payload = { ...msg, status: 'pendingApproval' };

      if (user.bonusPoints > room.requiredPoints) {
        payload.status = 'reserved';
        await room.update({ $inc: { availableAmount: -1 } });
        await user.update({ $inc: { bonusPoints: -1 * room.requiredPoints } });
        const history = await ReserveHistoryModel.create(payload);
        sendEmail(history.status);
        return history;
      }

      const history = await ReserveHistoryModel.create(payload);
      sendEmail(history.status);
      return history;
    }

    return {};
  } catch (err) {
    console.error('process reservation err:', err.message);
    return {};
  }
};

database.connect();

const consumer = getConsumer('ReservationGroup', mq.reservationTopic, database);

consumer.on('message', processReservation);

const { mq } = require('./src/config/vars');
const sendToQueue = require('./src/utils/sendToQueue');

sendToQueue(mq.reservationTopic, 'hello');

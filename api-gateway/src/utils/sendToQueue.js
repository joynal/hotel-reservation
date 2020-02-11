const producer = require('./producer');
const { mq } = require('../config/vars');

module.exports = (topic, messages) => {
  producer.send(
    [
      {
        topic,
        messages,
        attributes: mq.producerAttributes,
        timestamp: Date.now(),
      },
    ],
    (err, result) => {
      if (err) console.error('send to queue error:', err);
      if (result) console.log('sent message at:', result);
    },
  );
};

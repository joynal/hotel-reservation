const kafka = require('kafka-node');

const shutdown = require('./shutdown');
const { mq } = require('../config/vars');

const { ConsumerGroup } = kafka;


module.exports = (groupId, topic, db = null) => {
  const options = {
    kafkaHost: mq.kafkaBrokers,
    groupId,
  };

  if (mq.kafkaSecurity === true) {
    options.sasl = {
      mechanism: 'plain',
      username: mq.kafkaUsername,
      password: mq.kafkaPassword,
    };
  }

  const consumer = new ConsumerGroup(options, topic);

  consumer.on('error', (err) => {
    console.error(`${topic}-consumer err:`, err);
  });

  process.on('SIGINT', shutdown(consumer, db));
  process.on('SIGTERM', shutdown(consumer, db));

  return consumer;
};

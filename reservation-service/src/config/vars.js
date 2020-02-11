const path = require('path');

// import .env variables
require('dotenv-safe').config({
  path: path.join(__dirname, '../../.env'),
  sample: path.join(__dirname, '../../.env.example'),
});

module.exports = {
  env: process.env.NODE_ENV,

  mongo: {
    uri: process.env.MONGO_URI,
  },

  mq: {
    kafkaBrokers: process.env.KAFKA_BROKERS,
    noAckBatchSize: process.env.KAFKA_CLIENT_BATCH_SIZE,
    noAckBatchAge: process.env.KAFKA_CLIENT_BATCH_AGE,
    producerAcks: process.env.PRODUCER_ACKS,
    producerAttributes: process.env.PRODUCER_ATTRIBUTES,
    kafkaSecurity: JSON.parse(process.env.KAFKA_SECURITY_ENABLED),
    kafkaUsername: process.env.KAFKA_USERNAME,
    kafkaPassword: process.env.KAFKA_PASSWORD,
    reservationTopic: process.env.RESERVATION_TOPIC,
  },
};

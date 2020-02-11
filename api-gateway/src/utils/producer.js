const kafka = require('kafka-node');

const { HighLevelProducer } = kafka;
const Client = kafka.KafkaClient;

const { mq } = require('../config/vars');

const options = {
  kafkaHost: mq.kafkaBrokers,
  noAckBatchOptions: {
    noAckBatchSize: mq.noAckBatchSize,
    noAckBatchAge: mq.noAckBatchAge,
  },
};

if (mq.kafkaSecurity === true) {
  options.sasl = {
    mechanism: 'plain',
    username: mq.kafkaUsername,
    password: mq.kafkaPassword,
  };
}

const client = new Client(options);

const producer = new HighLevelProducer(client, {
  requireAcks: mq.producerAcks,
});

producer.on('error', (err) => {
  console.error('producer error:', err);
});

module.exports = producer;

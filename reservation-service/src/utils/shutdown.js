/**
 *
 * @param {*} consumer
 * @param {*} db
 */

module.exports = (consumer, db) => () => {
  console.log('shutdown started....');
  consumer.close(() => {
    console.log('kafka connection closed');
    if (db && db.disconnect) {
      db.disconnect(() => {
        console.log('db connection closed');
        process.exit(0);
      });
    } else {
      process.exit(0);
    }
  });
};

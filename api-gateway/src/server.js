const app = require('./config/express');
const database = require('./config/database');
const { port, env } = require('./config/vars');

database.connect();

// listen to requests
app.listen(port, () => console.log(`server started on port ${port} (${env})`));

module.exports = app;
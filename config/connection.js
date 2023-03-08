const { connect, connection } = require('mongoose');

connect('mongodb://localhost/socialNetwork_DB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;

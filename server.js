const express = require('express');
const app = express();

const mongodb = require('./data/database');

const PORT = process.env.PORT || 3000;

app.use('/', require('./routes'));

mongodb.initDb((err) => {
  if (err) {
    console.error(err);
  } else {
    app.listen(PORT, () => {
      console.log(`Database is listening and node running on port ${PORT}`);
    });
  }
});

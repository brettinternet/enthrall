const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      path = require('path'),
      colors = require('colors'),
      port = process.env.PORT || 3010,
      appName = `Enthrall`,
      app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(cors());
app.listen(port, () => {
  console.log(` ${appName} `.black.bgWhite.italic + ` is running on port `.green + ` ${port} `.white.bgBlue.bold);
});

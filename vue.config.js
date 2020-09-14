const fs = require('fs');

module.exports = {
  devServer: {
    https: {
      key: fs.readFileSync('./ssl/server.key'),
      cert: fs.readFileSync('./ssl/server.crt'),
    },
  },
};

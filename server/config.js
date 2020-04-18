const path = require('path');

const rootPath = __dirname;

module.exports = {
  rootPath,
  uploadPath: path.join(rootPath, 'public'),
  database: 'mongodb://localhost/cocktails-app',
  databaseOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  facebook: {
    appId: '3725321517510083',
    appSecret: '0ca0cfc0461b56d5ac25e313bdfef53f'
  }
};
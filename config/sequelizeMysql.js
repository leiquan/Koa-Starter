const Sequelize = require('sequelize');
let cfg = require('./envConfig');

const sequelize = new Sequelize('test', cfg.db.username, cfg.db.password, {
  host: cfg.db.host,
  port: cfg.db.port,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  operatorsAliases: false
});

sequelize.authenticate().then(() => {
  console.log('Databese connection has been established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

// 同步数据库模型到数据库
sequelize.sync({logging: false}).then(() => console.log('同步数据库模型成功...'));

// 公用一个静态变量实例，提升性能
module.exports = sequelize;

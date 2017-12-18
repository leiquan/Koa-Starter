let sequelize = require('../config/sequelizeMysql');

const News = sequelize.define('news', {

  id: {
    type: sequelize.Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    comment: '自增ID'
  },

  title: {
    type: sequelize.Sequelize.TEXT,
    comment: '新闻标题'
  },

  content: {
    type: sequelize.Sequelize.TEXT,
    comment: '新闻内容'
  },
  
  is_delete: {
    type: sequelize.Sequelize.INTEGER,
    comment: '是否删除(0:未删除;1:删除)',
    defaultValue: 0
  }

}, {
  underscored: true,
  freezeTableName: true
});

module.exports = News;

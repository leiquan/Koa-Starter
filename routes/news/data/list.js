let router = require('koa-router')();
let path = require('path');
const Sequelize = require('sequelize');

const Op = Sequelize.Op

let News = require('../../../models/News');

router.get('/', async function(ctx, next) {
  
  await News.findAndCountAll({
    logging: false
  }).then(newsList => {

    ctx.body = {
      data: newsList.rows,
      totalItems: newsList.count
    };

  });

});

module.exports = router.routes();

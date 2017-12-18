let router = require('koa-router')();
let path = require('path');
const Sequelize = require('sequelize');

const Op = Sequelize.Op

let News = require('../../../models/News');

router.post('/', async function(ctx, next) {

  const body = ctx.request.body;

  await News.create({
    title: body.title,
    content: body.content,
    is_delete: 0
  }).then(result => {

    let msg;

    if (result[0] > 0) {
      msg = 'Add news fail!'
    } else {
      msg = 'Add news success!'
    }
    ctx.body = {
      code: 0,
      msg: msg
    };
  });


});

module.exports = router.routes();

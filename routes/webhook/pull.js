let router = require('koa-router')();
let path = require('path');
var exec = require('child_process').exec;

var cmdStr = 'git pull';

router.get('/', async function(ctx, next) {

  let msg = null;

  await exec(cmdStr, function(err, stdout, stderr) {

    if (err) {

      console.log('webhook失败,' + stderr);

    } else {

      console.log('webhook成功,' + stdout);

    }

  });

  ctx.body = {
    code: 1,
    msg: '执行成功'
  };

});

module.exports = router.routes();

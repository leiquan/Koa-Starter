let router = require('koa-router')();
let path = require('path');
let News = require('../../models/News');

router.get('/', async function (ctx, next) {

    console.log('enter add');

    ctx.state = {
        title: 'Add New'
    };


    await ctx.render('news/add');

});

module.exports = router.routes();
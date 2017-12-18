let router = require('koa-router')();
let path = require('path');
let News = require('../../models/News');

router.get('/', async function (ctx, next) {

    let news = [];

    await News.findAndCountAll({
        logging: false
    }).then(newsList => {
        news = newsList.rows
    });


    ctx.state = {
        title: 'New List',
        welcome: 'Welcome to this website!',
        news: news
    };

    await ctx.render('news/list');

});

module.exports = router.routes();
let Koa = require('koa');
let Router = require('koa-router');
let views = require('koa-views');
let static = require('koa-static');
let routes = require('./routes/routes');
let body = require('koa-body');
const log4js = require('koa-log4');

// Log config
log4js.configure({
  replaceConsole: true,
  appenders: {
    cheese: {
      type: 'file',
      filename: 'logs/cheese.log'
    },
    error: {
      type: 'file',
      filename: 'logs/error.log'
    }
  },
  categories: {
    default: {
      appenders: ['cheese'],
      level: 'info'
    },
    error: {
      appenders: ['error'],
      level: 'error'
    }
  }
});

const logger = log4js.getLogger('cheese');
const loggerError = log4js.getLogger('error');

// Open logger
logger.level = 'all';
logger.debug("Logger已经开启！");

let app = new Koa();
let router = new Router();

// Access Log, Error Log
app.use(async(ctx, next) => {
  const start = new Date();
  let ms;
  try {
    await next();
    ms = new Date() - start;
    logger.info(`${ctx.method} ${ctx.request.ip} ${ctx.url} - ${ms}ms`);
  } catch (error) {
    ms = new Date() - start;
    loggerError.error(`${error} - ${ms}ms`)
  }
});

// File Upload: multipart
app.use(body({
  multipart: true
}));

// Static Resources 
app.use(static(__dirname + '/public'));

//EJS Views
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}));

// Pass router to the routes function
routes(router);

// Bind routes to APP
app.use(router.routes()).use(router.allowedMethods());

// Port, 4000 or env
let port = process.env.PORT || 4000;

app.listen(port);
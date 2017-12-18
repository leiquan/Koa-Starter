### KOA Best Practice

##### 代码结构：

-- config 数据库及开发配置文件

-- logs 日志数据

-- models 数据模型

-- public 静态文件

-- routes 路由控制器

-- utils 工具函数和依赖库文件

-- views 模板

##### 运行启动：

npm install

npm start

##### 技术框架：

后端框架：KOA

数据模型：Sequelize

模板语言：ejs

#####上线部署：

运行 npm run pm2docker，因为需要被supervisor托管


#### 技术要点：

1.环境优先

在开发一个项目的时候，首先考虑的便是Environment。在一般的公司里，会至少有两套环境：开发和线上。在一切大型公司里，比如百度，有三套环境：RD、QA、和 Release。因此统一好环境非常重要，对于后期的测试和上线，都有非常重要的意义。通过Environment的配置，可以免除其中的很多烦恼和错误。

所以本项目环境的统一入口便是config/envConfig了,这里会有各种数据库线上和线下的配置，线上线下接口的前缀的配置，以及任何需要区分线上线下的配置，比如文件上传路径等等。


2.日志很重要

因为Node环境的特殊性，本身没法提供日志，除非由前端代理nginx等来提供。所以很多场景我们需要自己实现，因此我们用log4js来实现，相关配置在app.js。日志路径在logs目录下。

3.选择ORM，节约代码量，提高效率

在Java和PHP环境下，有很多ORM，Node环境下也有一些，我觉得Sequelize算是Node环境下比较流行、强大和好用的ORM了，并且兼容多种数据库：PostgreSQL, MySQL, SQLite and MSSQL。

选好了ORM，我们再config/sequlizeMySQL下做好配置后，就可以在model里面定义数据对象了，其他代码里引用就好了。ORM其实大同小异，整体用法差不多。

```javascript
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

```

4.用框架，就要处理静态资源

因为框架需要处理路由，但是静态资源我们没法一个个写路由，那样就比较傻了，所以就有koa-static这边来托管静态资源，我们只要把静态资源放到public文件夹里面就好了。

5.路由处理

这个项目里面既用到了Server端的MVC渲染模式，也使用了前后端分离的提供接口的模式，因而约定了接口数据到放在data里面，直接页面访问就在对应目录下，比如：new/data/add 表示添加新闻的数据接口，new/add则是添加新闻的页面了。

因为路由很多，一个个配置很麻烦，所以写了routes.js，定义好URL和控制器的Map，直接玄幻require即可。

```javascript
let routes = function (router) {

  // Map
  let controller = {

    // Webhook
    '/webhook': './webhook/pull.js', // http://localhost:4000/webhook

    // Index, Page
    '/': './news/list', // http://localhost:4000/
    '/news/add': './news/add', // http://localhost:4000/news/add

    // API, Data
    '/news/data/list': './news/data/list', // http://localhost:4000/news/data/list
    '/news/data/add': './news/data/add', // http://localhost:4000/news/data/add

    // File Upload
    '/file/upload/image': './file/upload/image', // http://localhost:4000/file/upload/image

  };

  // Load All Controllers
  for (x in controller) {
    router.use(x, require(controller[x]));
  }

}

module.exports = routes;
```

6.async/await和promise
KOA框架的一大优点，就是方便的使用async和await。但是有时候，我们用第三方的库的时候，并不返回Promise，这时候我们需要手动封装一下Promise，比如routes/upload/image.js，因为代码比较长，就不贴了。




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
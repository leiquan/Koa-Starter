let router = require('koa-router')();
let path = require('path');
let fs = require('fs');
const os = require('os');
let formidable = require('formidable');
let request = require('request');

router.post('/', async function(ctx, next) {

  const file = ctx.request.body.files.file;
  
  let readStream = fs.createReadStream(file.path);

  var formData = {
    filecontent: readStream
  };

  let d = new Date();
  let year = d.getFullYear();
  let month = d.getMonth() + 1;
  let day = d.getDate();
  let hour = d.getHours();
  let minute = d.getMinutes() < 10
    ? ('0' + d.getMinutes())
    : d.getMinutes();
  let time = '' + year + month + day + hour + minute;

  let pn = 'upload/' + time + '_' + parseInt(Math.random() * (9999999 - 1000000 + 1) + 1000, 10).toString() + '_' + file.name;

  return new Promise((resolve, reject) => {

    var r = request.post('http://10.88.128.23:8000/resource/apacweb/' + pn, function optionalCallback(err, httpResponse, body) {
      ctx.body = {
        code: 0,
        data: body
      };
      resolve();
    })
    var form = r.form();
    form.append('filecontent', readStream, {filename: 'unicycle.jpg'});

    // let pn = parseInt(Math.random() * (9999 - 1000 + 1) + 1000, 10).toString() + '_' + file.name;
    // let destPath = path.join(path.resolve(__dirname, '../../../public/upload/images/'), pn);
    // let readStream = fs.createReadStream(file.path);
    // let writeStream = fs.createWriteStream(destPath);
    // readStream.pipe(writeStream);
    //
    // return new Promise((resolve, reject) => {
    //
    //   writeStream.on('close', function() {
    //     ctx.body = {
    //       code: 0,
    //       url: '/upload/images/' + pn
    //     };
    //     resolve();
    //   });
    //
    //   writeStream.on('error', function(error) {
    //     console.log(error);
    //     ctx.body = {
    //       code: 0,
    //       url: '',
    //       error: error.code
    //     };
    //     resolve();
    //   });
    //
    // });

  });
});

module.exports = router.routes();
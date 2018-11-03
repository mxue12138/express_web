var formidable = require('formidable');
var fs = require('fs');
module.exports = function (req, path) {
  return new Promise(function(resolve, reject){
    var form = new formidable.IncomingForm();
    form.uploadDir = rootDir + '/public/' + path;
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files){
      if (files.file) {
        fs.rename(files.file.path, form.uploadDir + fields.type + '_' + fields.dbIndex + '.png', function () {
          resolve(fields);
        }); 
      } else {
        resolve(fields);
      }
    })
  })
}
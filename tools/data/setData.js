var fs = require('fs');
module.exports = function (name, data) {
  fs.writeFile(rootDir + '/data/' + name + '.json', JSON.stringify(data, null, 2), function (error) {
    if (error) {
      return false;
    } else {
      return data;
    }
  })
}

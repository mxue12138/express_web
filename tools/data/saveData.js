var fs = require('fs');
module.exports = function (name, data) {
  fs.writeFileSync(rootDir + '/data/' + name + '.json', JSON.stringify(data, null, 2), function (error) {
    if (error) {
      return false;
    } else {
      return true;
    }
  })
}

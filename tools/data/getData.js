module.exports = function (name) {
  var data = require(rootDir + '/data/' + name + '.json');
  return data;
}

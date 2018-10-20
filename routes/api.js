var express = require('express');
var router = express.Router();
var getData = require(rootDir + '/tools/data/getData');
var setData = require(rootDir + '/tools/data/setData');
var md5 = require('md5');
var uploadImg = require(rootDir + '/tools/uploadImg');

router.post('/api/login', function(req, res) {
  var userDB = getData('user')[0];
  if (req.body.username == userDB.username && md5(req.body.password) == userDB.password) {
    res.cookie('username', userDB.username, {maxAge: 604800000});
    res.cookie('password', md5(userDB.username), {maxAge: 604800000});
    res.json({
      code: '1',
      msg: '登陆成功'
    });
  } else {
    res.json({
      code: '0',
      msg: '账号或密码错误'
    });
  }
});

router.post('/upload', function(req, res) {
  uploadImg(req, 'img\\index\\').then(function (data) {
    var indexData = getData('index');
    indexData[0][data.type].list[data.dbIndex].url = data.url;
    if (data.title) {
      indexData[0][data.type].list[data.dbIndex].title = data.title;
    }
    if (data.description) {
      indexData[0][data.type].list[data.dbIndex].description = data.description;
    }
    setData('index', indexData);
    res.send('ok');
  });
});

module.exports = router;

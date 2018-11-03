var express = require('express');
var router = express.Router();
var getData = require(rootDir + '/tools/data/getData');
var setData = require(rootDir + '/tools/data/setData');
var md5 = require('md5');
var uploadImg = require(rootDir + '/tools/uploadImg');
var formidable = require('formidable');
var path = require('path');
var fs = require('fs');

router.post('/api/login', function(req, res) {
  var userDB = getData('user')[0].list[0];
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
  uploadImg(req, 'img/index/').then(function (data) {
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

router.post('/api/classify', function(req, res) {
  var form = new formidable.IncomingForm();
  form.uploadDir = rootDir + '/public/img/index/';
  form.keepExtensions = true;
  form.parse(req, function(err, fields, files){
    var classifyData = getData('classify');
    var classifyList = classifyData[0].classify.list;
    var bannerList = classifyData[0].banner.list;
    if (fields.type == 'info') {
      classifyData[0].title = fields.title;
      classifyData[0].keywords = fields.keywords;
      classifyData[0].description = fields.description;
      setData('classify', classifyData);
      res.json({
        code: 1,
        data: {
          title: fields.title,
          keywords: fields.keywords,
          description: fields.description
        }
      });
    } else if (fields.type == 'list_add') {
      var filePath = files.file.path;
      var img = filePath.slice(filePath.lastIndexOf('/') + 1);
      classifyList.push({
        id: fields.id,
        title: fields.title,
        img: '/img/index/' + img
      });
      setData('classify', classifyData);
      res.json({
        code: 1,
        data: classifyList[classifyList.length - 1]
      });
    } else if (fields.type == 'list_update') {
      if (files.file) {
        var index = null;
        var filePath = files.file.path;
        var img = filePath.slice(filePath.lastIndexOf('/') + 1);
      }
      classifyList.forEach(function (val, i) {
        if(val.id == fields.id) {
          index = i;
          classifyList[i].title = fields.title;
          if (files.file) {
            fs.unlink(rootDir + '/public/img/index/' + classifyList[i].img.slice(classifyList[i].img.lastIndexOf('/') + 1), function (error) {
              if (error) {
                console.log(error);
              }
            });
            classifyList[i].img = '/img/index/' + img;
          }
        }
      });
      setData('classify', classifyData);
      res.json({
        code: 1,
        data: classifyList[index]
      });
    } else if (fields.type == 'list_delete') {
      classifyList.forEach(function (val, i) {
        if(val.id == fields.id) {
          fs.unlink(rootDir + '/public/img/index/' + classifyList[i].img.slice(classifyList[i].img.lastIndexOf('/') + 1), function (error) {
            if (error) {
              console.log(error);
            }
          });
          classifyList.splice(i, 1);
        }
      });
      setData('classify', classifyData);
      res.json({
        code: 1
      });
    } else if (fields.type == 'banner_add') {
      var filePath = files.file.path;
      var img = filePath.slice(filePath.lastIndexOf('/') + 1);
      bannerList.push({
        id: fields.id,
        url: fields.url,
        img: '/img/index/' + img
      });
      setData('classify', classifyData);
      res.json({
        code: 1,
        data: bannerList[bannerList.length - 1]
      });
    } else if (fields.type == 'banner_update') {
      if (files.file) {
        var index = null;
        var filePath = files.file.path;
        var img = filePath.slice(filePath.lastIndexOf('/') + 1);
      }
      bannerList.forEach(function (val, i) {
        if(val.id == fields.id) {
          index = i;
          bannerList[i].url = fields.url;
          if (files.file) {
            fs.unlink(rootDir + '/public/img/index/' + bannerList[i].img.slice(bannerList[i].img.lastIndexOf('/') + 1), function (error) {
              if (error) {
                console.log(error);
              }
            });
            bannerList[i].img = '/img/index/' + img;
          }
        }
      });
      setData('classify', classifyData);
      res.json({
        code: 1,
        data: bannerList[index]
      });
    } else if (fields.type == 'banner_delete') {
      bannerList.forEach(function (val, i) {
        if(val.id == fields.id) {
          fs.unlink(rootDir + '/public/img/index/' + bannerList[i].img.slice(bannerList[i].img.lastIndexOf('/') + 1), function (error) {
            if (error) {
              console.log(error);
            }
          });
          bannerList.splice(i, 1);
        }
      });
      setData('classify', classifyData);
      res.json({
        code: 1
      });
    } else {
      res.json({
        code: 0
      });
    }
  })
})

module.exports = router;

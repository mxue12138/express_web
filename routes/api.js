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

router.post('/api/index', function(req, res) {
  var form = new formidable.IncomingForm();
  form.uploadDir = rootDir + '/public/img/index/';
  form.keepExtensions = true;
  form.parse(req, function(err, fields, files){
    var indexData = getData('index');
    var bannerList = indexData[0].banner.list;
    var productsSlideList = indexData[0].products_slide.list;
    var productsMapList = indexData[0].products_map.list;
    var productsListList = indexData[0].products_list.list;
    if (fields.type == 'info') {
      indexData[0].title = fields.title;
      indexData[0].keywords = fields.keywords;
      indexData[0].description = fields.description;
      setData('index', indexData);
      res.json({
        code: 1,
        data: {
          title: fields.title,
          keywords: fields.keywords,
          description: fields.description
        }
      });
    } else if (fields.type == 'banner_add') {
      var filePath = files.file.path.split(path.sep).join('/');
      var img = filePath.slice(filePath.lastIndexOf('/') + 1);
      bannerList.push({
        id: fields.id,
        url: fields.url,
        img: '/img/index/' + img
      });
      setData('index', indexData);
      res.json({
        code: 1,
        data: bannerList[bannerList.length - 1]
      });
    } else if (fields.type == 'banner_update') {
      if (files.file) {
        var index = null;
        var filePath = files.file.path.split(path.sep).join('/');
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
      setData('index', indexData);
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
      setData('index', indexData);
      res.json({
        code: 1
      });
    } else if (fields.type == 'products_slide_add') {
      var filePath = files.file.path.split(path.sep).join('/');
      var img = filePath.slice(filePath.lastIndexOf('/') + 1);
      productsSlideList.push({
        id: fields.id,
        url: fields.url,
        title: fields.title,
        img: '/img/index/' + img
      });
      setData('index', indexData);
      res.json({
        code: 1,
        data: productsSlideList[productsSlideList.length - 1]
      });
    } else if (fields.type == 'products_slide_update') {
      if (files.file) {
        var index = null;
        var filePath = files.file.path.split(path.sep).join('/');
        var img = filePath.slice(filePath.lastIndexOf('/') + 1);
      }
      productsSlideList.forEach(function (val, i) {
        if(val.id == fields.id) {
          index = i;
          productsSlideList[i].url = fields.url;
          productsSlideList[i].title = fields.title;
          if (files.file) {
            fs.unlink(rootDir + '/public/img/index/' + productsSlideList[i].img.slice(productsSlideList[i].img.lastIndexOf('/') + 1), function (error) {
              if (error) {
                console.log(error);
              }
            });
            productsSlideList[i].img = '/img/index/' + img;
          }
        }
      });
      setData('index', indexData);
      res.json({
        code: 1,
        data: productsSlideList[index]
      });
    } else if (fields.type == 'products_slide_delete') {
      productsSlideList.forEach(function (val, i) {
        if(val.id == fields.id) {
          fs.unlink(rootDir + '/public/img/index/' + productsSlideList[i].img.slice(productsSlideList[i].img.lastIndexOf('/') + 1), function (error) {
            if (error) {
              console.log(error);
            }
          });
          productsSlideList.splice(i, 1);
        }
      });
      setData('index', indexData);
      res.json({
        code: 1
      });
    } else if (fields.type == 'products_map_update') {
      if (files.file) {
        var index = null;
        var filePath = files.file.path.split(path.sep).join('/');
        var img = filePath.slice(filePath.lastIndexOf('/') + 1);
      }
      productsMapList.forEach(function (val, i) {
        if(val.id == fields.id) {
          index = i;
          productsMapList[i].url = fields.url;
          productsMapList[i].title = fields.title;
          productsMapList[i].description = fields.description;
          if (files.file) {
            fs.unlink(rootDir + '/public/img/index/' + productsMapList[i].img.slice(productsMapList[i].img.lastIndexOf('/') + 1), function (error) {
              if (error) {
                console.log(error);
              }
            });
            productsMapList[i].img = '/img/index/' + img;
          }
        }
      });
      setData('index', indexData);
      res.json({
        code: 1,
        data: productsMapList[index]
      });
    } else if (fields.type == 'products_list_update') {
      if (files.file) {
        var index = null;
        var filePath = files.file.path.split(path.sep).join('/');
        var img = filePath.slice(filePath.lastIndexOf('/') + 1);
      }
      productsMapList.forEach(function (val, i) {
        if(val.id == fields.id) {
          index = i;
          productsListList[i].url = fields.url;
          productsListList[i].description = fields.description;
          if (files.file) {
            fs.unlink(rootDir + '/public/img/index/' + productsListList[i].img.slice(productsMapList[i].img.lastIndexOf('/') + 1), function (error) {
              if (error) {
                console.log(error);
              }
            });
            productsListList[i].img = '/img/index/' + img;
          }
        }
      });
      setData('index', indexData);
      res.json({
        code: 1,
        data: productsListList[index]
      });
    } else {
      res.json({
        code: 0
      });
    }
  })
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

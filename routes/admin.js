var express = require('express');
var router = express.Router();
var getData = require(rootDir + '/tools/data/getData');

router.get([
    '/admin/',
    '/admin/index.html',
    '/admin/webinfo.html',
    '/admin/indexinfo.html',
    '/admin/classify.html',
    '/admin/goods.html'
  ], function(req, res, next) {
  if (req.cookies.username == getData('user')[0].username && req.cookies.password == getData('user')[0].password) {
    next();
  } else {
    res.redirect('/admin/login.html');
  }
});

router.get('/admin/login.html', function(req, res) {
  if (req.cookies.username == getData('user')[0].username && req.cookies.password == getData('user')[0].password) {
    res.redirect('/admin/index.html');
    return;
  }
  res.render('admin/login');
});

router.get(['/admin/', '/admin/index.html'], function(req, res) {
  res.render('admin/index', {
    title: '管理后台首页',
    content: 'index'
  });
});

router.get('/admin/webinfo.html', function(req, res) {
  res.render('admin/index', {
    title: '网站信息配置',
    content: 'webinfo'
  });
});

router.get('/admin/indexinfo.html', function(req, res) {
  res.render('admin/index', {
    title: '首页信息配置',
    content: 'indexinfo',
    data: getData('index')[0]
  });
});

router.get('/admin/classify.html', function(req, res) {
  res.render('admin/index', {
    title: '商品分类管理',
    content: 'classify'
  });
});

router.get('/admin/goods.html', function(req, res) {
  res.render('admin/index', {
    title: '商品信息管理',
    content: 'goods'
  });
});

module.exports = router;

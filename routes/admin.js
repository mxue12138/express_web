var express = require('express');
var router = express.Router();

router.get(['/admin/', '/admin/index.html'], function(req, res) {
  res.render('admin/index', {
    title: '管理后台首页',
    content: 'index'
  });
});

router.get('/admin/login.html', function(req, res) {
  res.render('admin/login', {
    title: '登录'
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
    content: 'indexinfo'
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

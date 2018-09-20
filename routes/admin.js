var express = require('express');
var router = express.Router();

router.get(['/admin/', '/admin/index.html'], function(req, res) {
  res.render('admin/index');
});

router.get('/admin/login.html', function(req, res) {
  res.render('admin/login');
});

router.get('/admin/user.html', function(req, res) {
  res.render('admin/user');
});

router.get('/admin/shop.html', function(req, res) {
  res.render('admin/shop');
});

module.exports = router;

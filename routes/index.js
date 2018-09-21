var express = require('express');
var router = express.Router();
var getShopData = require('../tools/data/getData')('shop');

router.get(['/', '/index.html'], function(req, res) {
  res.render('index/index', {
    title: '首页',
    shop: getShopData
  });
});

module.exports = router;

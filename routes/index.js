var express = require('express');
var router = express.Router();
var getData = require(rootDir + '/tools/data/getData');

router.get(['/', '/index.html'], function(req, res) {
  res.render('index/index', {
    index_data: getData('index')
  });
});

router.get('/classify.html', function(req, res) {
  res.render('index/classify', {
    classify_data: getData('classify'),
    classify_id: req.query.id ? req.query.id : 0,
    shop_data: getData('shop')
  });
});

router.get('/product/shop_:sid.html', function(req, res) {
  var shopData = getData('shop');
  var shop_data = null;
  shopData[0].list.forEach(function (val, i) {
    if (req.params.sid == val.sid) {
      shop_data = val;
    }
  });
  res.render('index/product', {
    shop_data: shop_data
  });
});

module.exports = router;

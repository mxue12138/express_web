var express = require('express');
var router = express.Router();
var getData = require(rootDir + '/tools/data/getData');

router.get(['/', '/index.html'], function(req, res) {
  res.render('index/index', {
    data: getData('index')
  });
});

module.exports = router;

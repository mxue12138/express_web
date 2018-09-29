var express = require('express');
var router = express.Router();

router.get(['/', '/index.html'], function(req, res) {
  res.render('index/index', {
    title: '首页'
  });
});

module.exports = router;

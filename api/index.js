var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.send({
    '/medium': 'read data from medium profile',
    '/mail': 'send mail'
  })
})

router.use('/medium', require('./medium'));
router.use('/mail', require('./mail'));

module.exports = router;

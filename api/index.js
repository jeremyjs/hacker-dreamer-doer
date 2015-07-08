var express = require('express');
var router = express.Router();

router.use('/mail', require('./mail'));

module.exports = router;

var express = require('express');
var account = require('../controller/account');

var router = express.Router();

router.route('/login').post(account.login);
router.route('/signUp').post(account.signUp);
module.exports = router;
var auth = require("../comman/common");
var express = require('express');
var account = require('../controller/account');
var project = require('../controller/project');

var router = express.Router();

router.route('/login').post(account.login);
router.route('/signUp').post(account.signUp);
router.route('/logout').post(account.logout);

router.route('/project/add').post(project.add, auth.authenticationMiddleware,function(){});
router.route('/project/getAll').get(project.getAll);
module.exports = router;
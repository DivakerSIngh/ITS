var mongoose = require('mongoose');
var assert = require('assert')

var schema = mongoose.Schema;

var user = new schema({
    userName: String,
    email: String,
    organizationId: String,
    password: String,
    mobileNo: String,
    image: String

});



module.exports = mongoose.model('user', user);
var mongoose = require('mongoose');
var assert = require('assert')

var schema = mongoose.Schema;

var user = new schema({
    userName: String,
    email: String,
    organizationId: String,
    password: String,
    mobileNo: String,
    image: String,

    status: {
        type: String,
        default: 2
    },

});

// 1 for active user   and 2 for inactive user



module.exports = mongoose.model('user', user);
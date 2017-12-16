var mongoose = require('mongoose');
var assert = require('assert')

var schema = mongoose.Schema;

var organization = new schema({
    name: String,
    createdBy: String,
    createdOn: String
});

module.exports = mongoose.model('organization', organization);
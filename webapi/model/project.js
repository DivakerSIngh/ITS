var mongoose = require('mongoose');
var assert = require('assert')

var schema = mongoose.Schema;

var project = new schema({
    name: String,
    groupId: String,
    groupName: String,
    organizationId: String,
    percentComplete: {
        type: Number,
        default: 0
    },
    statusId: String,
    status: String,
    image: String,
    reportingManagerId:String,
    reportingManagerName:String,
    createdBy:String,
    createdOn:{
        type: Date,
        default: new Date()
    },
    color:{
        type:String,
        default:'#24ab10'
    }
});

// 1 for active user   and 2 for inactive user



module.exports = mongoose.model('project', project);
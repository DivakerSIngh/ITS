var mongoose = require('mongoose');
var assert = require('assert');
let async = require('async');
// jwt = require('jsonwebtoken');
// bcrypt = require('bcrypt');

var project = require('../model/project');


module.exports = {
    add: function(req, res) {
        console.log("project data>==>:", req.body)
        var projects = new project(req.body);
        projects.save(function(err, data) {
            if (err) {
                console.log(err);
            } else {
                async.waterfall([
                    function(callback) {
                        domain.Project.find({}).lean().exec(function(err, adminObject) {
                            if (err) {
                                commonModule.commonResponseHandler(res, err, responseCode.internal_server_error, responseCode.server_error_code, true)
                                return;
                            }
                            if (adminObject) {
                                callback(null,adminObject)
                            } else {
                                commonModule.commonResponseHandler(res, {}, responseCode.invalid_username_password_msg, responseCode.invalid_username_password_code, true)
                            }
                        })
                    }
                ], function(err, result) {
                    commonModule.commonResponseHandler(res, result, responseCode.data_fetch_msg, responseCode.success_code, false)
                })
        
            }

        })     
    },
    getAll: function(req, res) {
        async.waterfall([
            function(callback) {
                domain.Project.find({}).lean().exec(function(err, adminObject) {
                    if (err) {
                        commonModule.commonResponseHandler(res, err, responseCode.internal_server_error, responseCode.server_error_code, true)
                        return;
                    }
                    if (adminObject) {
                        callback(null,adminObject)
                    } else {
                        commonModule.commonResponseHandler(res, {}, responseCode.invalid_username_password_msg, responseCode.invalid_username_password_code, true)
                    }
                })
            }
        ], function(err, result) {
            commonModule.commonResponseHandler(res, result, responseCode.data_fetch_msg, responseCode.success_code, false)
        })

        
        
       
    }

}


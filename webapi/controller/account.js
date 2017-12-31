var mongoose = require('mongoose');
var assert = require('assert');
let async = require('async');
// jwt = require('jsonwebtoken');
// bcrypt = require('bcrypt');

var loginUser = require('../model/user');
var organization = require('../model/organization')

module.exports = {
    login: function(req, res) {
        console.log("login request..>>", req.body)
        var userDetails = req.body;
        async.waterfall([
            function(callback) {
                var response = checkLoginUserExist(userDetails.userName, userDetails.password, res, callback);
                console.log(response);
            }
        ])
    },


    signUp: function(req, res) {
        ////////////////////////////start/////////////////
        async.waterfall([
            function(callback) {
                var org = new organization({
                    name: req.body.organization.name,
                    createdBy: req.body.userName,
                    createdOn: new Date()
                });

                var organizations = new organization(org);
                organizations.save(function(err, data) {
                    if (err) {
                        console.log("error>==>:", err)
                        return (err, data);
                    } else {
                        console.log("error else>==>:", data._id);
                        callback(null, data._id);
                        console.log('organization save response=======>', data);
                        req.body.organizationId = data._id;
                        // return;
                    }

                })
            },
            function(orgdata, callback) {
                console.log("next function>==>:", orgdata);
                req.body.organizationId = orgdata; //data._id;
                console.log("next function body>==>:", req.body);
                var user = new loginUser(req.body);
                user.save(function(err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(data)
                    }

                })
            }
        ], function(err, result) {
            console.log("result", result)
                // commonModule.commonResponseHandler(res, result, adminString.login_success_msg, adminString.success_code, false)
        })

    }

}
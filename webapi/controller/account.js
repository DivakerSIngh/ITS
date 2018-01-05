var mongoose = require('mongoose');
var assert = require('assert');
let async = require('async');
// jwt = require('jsonwebtoken');
// bcrypt = require('bcrypt');

var loginUser = require('../model/user');
var organization = require('../model/organization')

module.exports = {
    login: function(req, res) {
        let status = commonModule.validateRequestBody(req, res, ['email', 'password'])
        console.log("login status=>", status)
        if (status) {
            let encryptedPassword = commonModule.passwordEncryption(req.body.password, config.salt);
            console.log("encryptedPassword=>", encryptedPassword)
            async.waterfall([
                function(callback) {
                    checkLoginUserExist(req.body.email, encryptedPassword, res, callback)
                },
                function(adminObject, callback) {
                    generateAccessToken(adminObject, res, callback)
                }
            ], function(err, result) {
                // Logger.info("result", result)
                commonModule.commonResponseHandler(res, result, responseCode.login_success_msg, responseCode.success_code, false)
            })
        }
    },
    signUp: function(req, res) {
        req.body.password = commonModule.passwordEncryption(req.body.password, config.salt);
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
                // commonModule.commonResponseHandler(res, result, responseCode.login_success_msg, responseCode.success_code, false)
        })

    }

}

let checkLoginUserExist = function(email, password, res, callback) {
    domain.User.findOne({
        email: email,
        password: password,
        status: 2
    }).lean().exec(function(err, adminObject) {
        if (err) {
            commonModule.commonResponseHandler(res, err, responseCode.internal_server_error, responseCode.server_error_code, true)
            return;
        }
        if (adminObject) {
            callback(null, adminObject)
                //generateAccessToken(adminObject, )
        } else {
            //Invalid Username and password
            commonModule.commonResponseHandler(res, {}, responseCode.invalid_username_password_msg, responseCode.invalid_username_password_code, true)
        }
    })
};

let generateAccessToken = function(adminObject, res, callback) {
    console.log('generatetoken me aagaya')
    let accessToken = "asfahsjfhajsfasfa-asfasfhasf-asfasf12132"; //uuid.v1();
    console.log("Token", accessToken)
    domain.User.findOneAndUpdate({
            _id: adminObject._id
        }, {
            $set: {
                accessToken: accessToken,
                session_start_time: new Date()
            }
        }, {
            new: true
        },
        function(err, dt1) {
            if (err) {
                commonModule.commonResponseHandler(res, err, responseCode.internal_server_error, responseCode.server_error_code, true)
                return
            }
            console.log("access token" + accessToken)
            callback(null, {
                adminObject: adminObject,
                accessToken: accessToken
            })
        })
}
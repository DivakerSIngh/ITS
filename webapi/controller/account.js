var mongoose = require('mongoose');
var assert = require('assert');
let async = require('async');
// jwt = require('jsonwebtoken');
// bcrypt = require('bcrypt');

var loginUser = require('../model/user');
var organization = require('../model/organization')

module.exports = {
    login: function(req, res) {
        res.send('login success')
    },


    signUp: function(req, res) {
        ////////////////////////////start/////////////////
        // async.waterfall([
        //         function(callback) {
        //             saveOrganization(req.body, res, callback)
        //         },
        //         function(orgdata, callback) {
        //             saveUser(req.body, orgdata, res, callback)
        //         }
        //     ], function(err, result) {
        //         console.log("result", result)
        //             // commonModule.commonResponseHandler(res, result, adminString.login_success_msg, adminString.success_code, false)
        //     })
        ////////////end//////////////////////////////////
        console.log(req.body)

        console.log('org data', req.body.organization);
        var org = new organization({
            name: req.body.organization.name,
            createdBy: req.body.userName,
            createdOn: new Date()
        });



        console.log('org data', org);
        //    /////////////////////////save organization first///////////////////
        var organizations = new organization(org);
        var userDetails = req.body;
        organizations.save(function(err, data) {
                if (err) {
                    return (err, data);
                } else {
                    console.log('organization save response=======>', data);
                    req.body.organizationId = data._id;
                    var user = new loginUser(req.body);
                    user.save(function(err, data) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.send(data)
                        }

                    })
                    return (err, data);
                }

            })
            // var resonse = this.saveOrganization(org);
            //console.log(resonse);
            //var organization= req.body


    }

}
saveOrganization = function(request, res, callback) {
    console.log('saveOrganization=======>', request);
    var org = new organization({
        name: request.organization.name,
        createdBy: request.userName,
        createdOn: new Date()
    });
    org.save(function(err, data) {
        if (err) {
            return (err, data);
        } else {
            console.log('organization save response=======>', data);
            callback(err, data);
        }

    })
}
saveUser = function(request, callback) {
    console.log("user request>>>>>>>>>>>>>>>>>>>", request);
    console.log("calback>>>>>>>>>>>>>>>>>", callback);
    // req.body.organizationId = data._id;
    // var user = new loginUser(req.body);
    // user.save(function(err, data) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         res.send(data)
    //     }

    // })
}